'use client'

import { useEffect, useState } from 'react'

import { Color, Media as TypeMedia, Product, Size } from '@/payload-types'
import { AddToCartButton } from '../AddToCartButton'

import classes from './index.module.scss'
import { useVarient } from '@/providers/Varient'

const groupVariantsByColor = (variants: any[]): any[] => {
  return variants.reduce((acc: any[], variant) => {
    // Check if the color group already exists
    const colorGroup = acc.find(
      (group) => (group.color as Color).value === (variant.color as Color).value,
    )

    if (colorGroup) {
      // Add the variant to the existing group
      colorGroup.variants.push(variant)
    } else {
      // Create a new group for the color
      acc.push({
        color: variant.color as Color,
        variants: [variant as any],
      })
    }
    return acc
  }, [])
}
const Add = ({
  productId,
  variantId,
  stockNumber,
  product,
}: {
  productId: string
  variantId: string
  stockNumber: number
  product: Product
}) => {
  const { varient, setVarient } = useVarient()
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [groupedVariants, setGroupedVariants] = useState<any[]>(
    groupVariantsByColor(product.variants as any[]),
  )

  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string
  }>({})
  const [selectedVariant, setSelectedVariant] = useState<any>()

  const [selectedColor, setSelectedColor] = useState<any>(groupedVariants[0])
  const [selectedSize, setSelectedSize] = useState<any>(selectedColor?.variants[0])
  useEffect(() => {
    setSelectedSize(selectedColor?.variants[0])
  }, [selectedColor])

  useEffect(() => {
    setVarient(selectedSize)
  }, [selectedSize, setVarient])
  const handleQuantity = (type: 'i' | 'd') => {
    if (type === 'd' && quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
    if (type === 'i' && quantity < stockNumber) {
      setQuantity((prev) => prev + 1)
    }
  }
  return (
    <div className={classes.container}>
      {groupedVariants?.length > 0 && (
        <>
          <h5 className={classes.title}>Color</h5>
          <div className={classes.quantityWrapper}>
            <div
              style={{
                display: 'flex', // flex
                flexDirection: 'column', // flex-col
                gap: '1rem', // gap-4 -> 4 * 0.25rem = 1rem
              }}
            >
              <ul
                style={{
                  display: 'flex', // flex
                  alignItems: 'center', // items-center
                  gap: '0.75rem', // gap-3 -> 3 * 0.25rem = 0.75rem
                }}
              >
                {groupedVariants?.map((choice) => {
                  const disabled = false
                  const selected =
                    (selectedColor?.color as Color).value === (choice.color as Color).value

                  const clickHandler = disabled ? undefined : () => setSelectedColor(choice)

                  return (
                    <li
                      style={{
                        width: '2rem', // w-8 -> 8 divided by 4 = 2rem
                        height: '2rem', // h-8 -> 8 divided by 4 = 2rem
                        borderRadius: '9999px', // rounded-full -> full border radius
                        border: '1px solid #D1D5DB', // ring-1 ring-gray-300 -> 1px solid with gray color
                        position: 'relative',
                        backgroundColor: (choice.color as Color).value,
                        cursor: 'pointer',
                      }}
                      onClick={clickHandler}
                      key={(choice.color as Color).title}
                    >
                      {selected && (
                        <div
                          style={{
                            position: 'absolute',
                            width: '2.5rem', // w-10 -> 10 divided by 4 = 2.5rem
                            height: '2.5rem', // h-10 -> 10 divided by 4 = 2.5rem
                            borderRadius: '9999px', // rounded-full -> full border radius
                            border: '2px solid', // ring-2 -> 2px solid border
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)', // centers the element
                          }}
                        />
                      )}
                      {disabled && (
                        <div
                          style={{
                            position: 'absolute',
                            width: '2.5rem', // w-10 -> 2.5rem
                            height: '2px', // h-[2px] -> 2px height
                            backgroundColor: '#F87171', // bg-red-400
                            transform: 'translate(-50%, -50%) rotate(45deg)', // centers and rotates
                            top: '50%',
                            left: '50%',
                          }}
                        />
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </>
      )}

      {selectedColor?.variants?.length > 0 && (
        <>
          <h5 className={classes.title}>Size</h5>
          <div className={classes.quantityWrapper}>
            <div
              style={{
                display: 'flex', // flex
                flexDirection: 'column', // flex-col
                gap: '1rem', // gap-4 -> 4 * 0.25rem = 1rem
              }}
            >
              <ul
                style={{
                  display: 'flex', // flex
                  alignItems: 'center', // items-center
                  gap: '0.75rem', // gap-3 -> 3 * 0.25rem = 0.75rem
                  flexWrap: 'wrap',
                }}
              >
                {selectedColor?.variants?.map((choice) => {
                  const disabled = false
                  const selected = selectedSize?.sku === choice?.sku

                  const clickHandler = disabled ? undefined : () => setSelectedSize(choice)

                  return (
                    <li
                      style={{
                        border: '1px solid var(--theme-elevation-900)', // ring-1 ring-lama (assuming `lama` is #B1AFA7)
                        borderRadius: '1rem', // rounded-md -> 0.375rem (6px)
                        paddingTop: '0.2rem', // py-1 -> 0.25rem
                        paddingBottom: '0.2rem', // py-1 -> 0.25rem
                        paddingLeft: '1rem', // px-4 -> 1rem
                        paddingRight: '1rem', // px-4 -> 1rem
                        fontSize: '0.8rem', // text-sm -> 0.875rem (14px)
                        cursor: disabled ? 'not-allowed' : 'pointer',
                        backgroundColor: selected
                          ? `var(--theme-elevation-900)`
                          : disabled
                            ? `var(--theme-elevation-900)`
                            : `var(--theme-elevation-100)`,
                        color:
                          selected || disabled
                            ? `var(--theme-elevation-100)`
                            : `var(--theme-elevation-900)`,
                        boxShadow: disabled ? 'none' : '',
                      }}
                      key={(choice.size as Size).title}
                      onClick={clickHandler}
                    >
                      {(choice.size as Size).title}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </>
      )}

      <h5 className={classes.title}>Choose a Quantity</h5>
      <div className={classes.quantityWrapper}>
        <div className={classes.quantityControls}>
          <button
            className={classes.decrementButton}
            onClick={() => handleQuantity('d')}
            disabled={quantity === 1}
          >
            <span className={classes.incrementDecrementButtonLebel}>-</span>
          </button>
          {quantity}
          <button
            className={classes.incrementButton}
            onClick={() => handleQuantity('i')}
            disabled={quantity === stockNumber}
          >
            <span className={classes.incrementDecrementButtonLebel}>+</span>
          </button>
        </div>

        {stockNumber < 1 ? (
          <div className={classes.outOfStock}>Product is out of stock</div>
        ) : stockNumber < 10 ? (
          <div className={classes.stockInfo}>
            Only <span className={classes.stockNumber}>{stockNumber} items</span> left!
            <br /> {"Don't"} miss it
          </div>
        ) : (
          <></>
        )}

        <AddToCartButton
          product={product}
          quantity={quantity}
          variant={selectedSize}
          className={classes.addToCartButton}
        />
      </div>
    </div>
  )
}

export default Add
