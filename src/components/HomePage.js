import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { IMAGE_NAMES } from "../constant";
import { getData } from "../db/actions";

const Gifts = () => {
  const [gifts, setGifts] = useState(() =>
    IMAGE_NAMES.map((image) => ({
      image_url: `/images/${image}.png`,
      imageId: image,
      name: "?",
    }))
  );

  useEffect(() => {
    const handleAddedUser = (users) => {
      console.log("onchange here");
      const newGifts = gifts.map((gift) => {
        const newGift = { ...gift };
        const matchedImage = users.find(
          (user) => user.imageId === gift.imageId
        );
        if (matchedImage) {
          newGift.name = matchedImage.name;
        }
        return newGift;
      });
      setGifts(newGifts);
    };

    const unsubscribe = getData(handleAddedUser);

    return () => unsubscribe();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="w-5/6 absolute top-[190px] sm:top-[220px] md:top-[250px] lg:top-[280px] xl:top-[45%] bottom-0 left-1/2 pt-2 pb-5 text-center translate-x-[-50%] grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 md:gap-7 overflow-y-scroll example shadow-lg">
      {gifts.map((gift) => (
        <div
          key={gift.image_url}
          className="flex flex-col items-center justify-center"
        >
          <img
            src={gift.image_url}
            alt="gift"
            className="image--main w-[90px] sm:w-[100px] md:w-[120px] lg:w-[135px]"
          />

          <span className="pacifico-regular text-xl min-h-[36px] md:text-2xl text-yellow-400">
            {gift.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function HomePage() {
  return (
    <Layout>
      <Gifts />
    </Layout>
  );
}
