import {
  collection,
  runTransaction,
  doc,
  getDocs,
  onSnapshot,
  DocumentReference,
} from "firebase/firestore";
import { User, IMAGE_NAMES } from "../constant";
import { db } from "./firebaseConfig";

const getData = (onAddUser: (users: User[]) => void) => {
  const usersCollection = collection(db, "users");

  // Đăng ký listener để theo dõi thay đổi dữ liệu
  const unsubscribe = onSnapshot(usersCollection, (querySnapshot) => {
    console.log("Listener: Add an user!!!");
    if (querySnapshot.empty) {
      onAddUser([]);
      return;
    }

    const users: User[] = querySnapshot.docs.map((doc) => doc.data() as User);
    onAddUser(users);
  });

  // Trả về hàm `unsubscribe` để ngắt kết nối khi không cần thiết
  return unsubscribe;
};

// Hàm random imageId chưa được sử dụng
const getRandomGiftId = async (
  usedGiftImages: string[]
): Promise<string | null> => {
  const availableGiftImages = IMAGE_NAMES.filter(
    (name) => !usedGiftImages.includes(name)
  );

  // Random imageId từ danh sách chưa được sử dụng
  if (availableGiftImages.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * availableGiftImages.length);
  return availableGiftImages[randomIndex];
};

const addData = async (name: User["name"]) => {
  try {
    // Bước 1: Sử dụng runTransaction để đảm bảo thao tác nguyên tử (atomic)
    await runTransaction(db, async (transaction) => {
      // console.log("waiting for 5 second");
      // await new Promise((resolve) => {
      //   setTimeout(resolve, 5000);
      // });

      // console.log("after waiting");

      // Bước 2: Kiểm tra nếu name đã tồn tại
      const usersCollection = collection(db, "users");
      const querySnapshot = await getDocs(usersCollection);

      let isNameExist = false;
      const usedGiftImages: string[] = [];

      querySnapshot.forEach((doc) => {
        const user = doc.data() as User;

        if (user.name === name) {
          isNameExist = true;
        }
        if (user.imageId) {
          usedGiftImages.push(user.imageId);
        }
      });

      if (isNameExist) {
        throw new Error(`Duplicate user.`);
      }

      // Bước 3: Lấy một imageId chưa được sử dụng
      const imageId = await getRandomGiftId(usedGiftImages);

      if (!imageId) {
        throw new Error("No available imageId.");
      }

      // Tạo tài liệu người dùng mới
      const newUser: User = { name, imageId };

      // Bước 4: Kiểm tra và thêm người dùng vào Firestore
      const userRef = doc(collection(db, "users"));
      transaction.set(userRef, newUser);
    });

    console.log("User added successfully");
  } catch (e) {
    if (e.message === "Duplicate user.") {
      return {
        isDuplicatedName: true,
      };
    }
  }
};

const updateData = async (previousName: User["name"], name: User["name"]) => {
  try {
    // Bước 1: Sử dụng runTransaction để đảm bảo thao tác nguyên tử (atomic)
    await runTransaction(db, async (transaction) => {
      // Bước 2: Kiểm tra nếu name đã tồn tại
      const usersCollection = collection(db, "users");

      let isNameExist = false;
      let userDocToUpdate: DocumentReference | null = null;

      const querySnapshot = await getDocs(usersCollection);
      querySnapshot.forEach((doc) => {
        const user = doc.data() as User;
        if (user.name === name) {
          isNameExist = true;
        }
        if (user.name === previousName) {
          userDocToUpdate = doc.ref; // Lưu lại tham chiếu đến document cần cập nhật
        }
      });
      if (isNameExist) {
        throw new Error(`Duplicate user.`);
      }
      if (!userDocToUpdate) {
        throw new Error(`User with previousName "${previousName}" not found.`);
      }

      // Bước 3: Cập nhật tên của người dùng
      transaction.update(userDocToUpdate, { name });
    });

    console.log("User updated successfully");
  } catch (e) {
    if (e.message === "Duplicate user.") {
      return {
        isDuplicatedName: true,
      };
    }
  }
};

export { getData, addData, updateData };
