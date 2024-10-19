'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import classes from './index.module.scss'

const Reviews: React.FC<{ productId: string }> = ({ productId }) => {
  const [reviews, setReviews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // const reviewRes = await fetch(
        //   `https://api.fera.ai/v3/public/reviews?product.id=${productId}&public_key=${process.env.NEXT_PUBLIC_FERA_ID}`
        // );
        // const data = await reviewRes.json();
        setReviews([])
      } catch (error) {
        console.error('Error fetching reviews:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [productId])

  if (loading) {
    return <div>Loading reviews...</div>
  }

  if (reviews.length === 0) {
    return <>{/* <div>No reviews available.</div> */}</>
  }

  return (
    <div className={classes.reviewsContainer}>
      {reviews && <h5 className={classes.heroReviewsTitle}>User Reviews</h5>}
      {reviews.map((review: any) => (
        <div className={classes.review} key={review?.id}>
          {/* USER */}
          <div className={classes.userInfo}>
            <Image
              src={review?.customer?.avatar_url}
              alt=""
              width={32}
              height={32}
              className={classes.avatar}
            />
            <span>{review?.customer?.display_name}</span>
          </div>
          {/* STARS */}
          <div className={classes.stars}>
            {Array.from({ length: review?.rating }).map((_, index) => (
              <Image src="/star.png" alt="" key={index} width={16} height={16} />
            ))}
          </div>
          {/* DESC */}
          {review?.heading && <p>{review?.heading}</p>}
          {review?.body && <p>{review?.body}</p>}
          {/* MEDIA */}
          <div className={classes.media}>
            {review?.media?.map((media: any) => (
              <Image
                src={media?.url}
                key={media?.id}
                alt=""
                width={100}
                height={50}
                className={classes.mediaImage}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Reviews
