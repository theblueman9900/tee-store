'use client'

import { useState } from 'react'
import Image from 'next/image'

import classes from './index.module.scss'
import { useVarient } from '@/providers/Varient'

const ProductImages = ({ items }: { items: any }) => {
  const [index, setIndex] = useState(0)
  const { varient, setVarient } = useVarient()
  const images = varient?.images ?? items
  return (
    <div className={classes.productImagesContainer}>
      <div className={classes.mainImageContainer}>
        <Image
          src={images[index]?.image?.url}
          alt=""
          fill
          sizes="50vw"
          className={classes.mainImage}
        />
      </div>
      <div className={classes.thumbnailContainer}>
        {images.map((item: any, i: number) => (
          <div className={classes.thumbnail} key={i} onClick={() => setIndex(i)}>
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
  )
}

export default ProductImages
