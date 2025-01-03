import React, { Fragment } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Order } from '@/payload-types';
import { HR } from '@/components/HR';
import { Media } from '@/components/Media';
import { Price } from '@/components/Price';
import { formatDateTime } from '@/utilities/formatDateTime';
import { getMeUser } from '@/utilities/getMeUser';
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph';

import classes from './index.module.scss';

type OrderPageProps = {
  params: Promise<{ id: string }>; // Explicitly type params
};

export default async function OrderPage({ params: paramsPromise  }: OrderPageProps) {
  const { id } = await paramsPromise// Destructure id after ensuring params is awaited
  const { token } = await getMeUser({
    nullUserRedirect: `/login?error=${encodeURIComponent(
      'You must be logged in to view this order.'
    )}&redirect=${encodeURIComponent(`/order/${id}`)}`,
  });

  let order: Order | null = null;

  try {
    order = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
    })?.then(async (res) => {
      if (!res.ok) notFound();
      const json = await res.json();
      if ('error' in json && json.error) notFound();
      if ('errors' in json && json.errors) notFound();
      return json;
    });
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
  }

  if (!order) {
    notFound();
  }

  return (
    <div>
      <h5>
        {`Order`}
        <span className={classes.id}>{` ${order.id}`}</span>
      </h5>
      <div className={classes.itemMeta}>
        <p>{`ID: ${order.id}`}</p>
        <p>{`Ordered On: ${formatDateTime(order.createdAt)}`}</p>
        <p className={classes.total}>
          {'Total: '}
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'inr',
          }).format(order.total)}
        </p>
        <p className={classes.total}>Address:</p>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p
            style={{
              width: '49%',
              borderRadius: '5px',
            }}
          >{`Receiver Name: ${order.address.name}`}</p>
          <p
            style={{
              width: '49%',
              borderRadius: '5px',
            }}
          >{`Email: ${order.address.email}`}</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p
            style={{
              width: '49%',
              borderRadius: '5px',
            }}
          >{`Phone: ${order.address.phone}`}</p>
          <p
            style={{
              width: '49%',
              borderRadius: '5px',
            }}
          >{`Street: ${order.address.street}`}</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p
            style={{
              width: '49%',
              borderRadius: '5px',
            }}
          >{`City: ${order.address.city}`}</p>
          <p
            style={{
              width: '49%',
              borderRadius: '5px',
            }}
          >{`State: ${order.address.state}`}</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p
            style={{
              width: '49%',
              borderRadius: '5px',
            }}
          >{`Country: ${order.address.country}`}</p>
          <p
            style={{
              width: '49%',
              borderRadius: '5px',
            }}
          >{`Pincode: ${order.address.postalCode}`}</p>
        </div>
      </div>

      <div className={classes.order}>
        {order.items?.map((item, index) => {
          if (typeof item.product === 'object') {
            const {
              quantity,
              product,
              product: { title, meta },
            } = item;

            const metaImage = meta?.image;

            return (
              <Fragment key={index}>
                <div className={classes.row}>
                  <Link href={`/products/${product.slug}`} className={classes.mediaWrapper}>
                    {!metaImage && <span className={classes.placeholder}>No image</span>}
                    {metaImage && typeof metaImage !== 'string' && (
                      <Media
                        className={classes.media}
                        imgClassName={classes.image}
                        resource={metaImage}
                        fill
                      />
                    )}
                  </Link>
                  <div className={classes.rowContent}>
                    <h6 className={classes.title}>
                      <Link href={`/products/${product.slug}`} className={classes.titleLink}>
                        {title}
                      </Link>
                    </h6>
                    <p>{`Quantity: ${quantity}`}</p>
                    <Price product={product} button={false} quantity={quantity ?? 0} />
                  </div>
                </div>
              </Fragment>
            );
          }

          return null;
        })}
      </div>
      <HR className={classes.hr} />
    </div>
  );
}

export async function generateMetadata({ params: paramsPromise }: OrderPageProps): Promise<Metadata> {
  const { id } = await paramsPromise

  if (id) {
    return {
      title: `Order ${id}`,
      description: `Order details for order ${id}.`,
      openGraph: mergeOpenGraph({
        title: `Order ${id}`,
        url: `/orders/${id}`,
      }),
    };
  } else {
    return {
      title: 'Orders',
      description: 'Your orders.',
      openGraph: mergeOpenGraph({
        title: 'Orders',
        url: '/orders',
      }),
    };
  }
}
