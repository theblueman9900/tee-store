"use client";

import Image from "next/image";
import { useState } from "react";
import classes from './index.module.scss';

const ProductImages = ({ items }: { items: any }) => {
  const [index, setIndex] = useState(0);

  return (
    <div className={classes.productImagesContainer}>
      <div className={classes.mainImageContainer}>
        <Image
          src={items[index]?.image?.url}
          alt=""
          fill
          sizes="50vw"
          className={classes.mainImage}
        />
      </div>
      <div className={classes.thumbnailContainer}>
        {items.map((item: any, i: number) => (
          <div
            className={classes.thumbnail}
            key={item._id}
            onClick={() => setIndex(i)}
          >
            <Image
              src={item?.image?.url}
              alt=""
              fill
              sizes="30vw"
              className={classes.thumbnailImage}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
