'use client'

import { useState } from 'react'
import classes from './index.module.scss'
import { AddToCartButton } from '../AddToCartButton'
import {
  Category,
  Media as TypeMedia,
  Product,
  Variant,
  GroupedVariants,
} from '../../../payload/payload-types'

const groupVariantsByColor = (variants: Variant[]): GroupedVariants[] => {
  return variants.reduce((acc: GroupedVariants[], variant) => {
    // Check if the color group already exists
    const colorGroup = acc.find(group => group.color.value === variant.color.value)

    if (colorGroup) {
      // Add the variant to the existing group
      colorGroup.variants.push(variant)
    } else {
      // Create a new group for the color
      acc.push({
        color: variant.color,
        variants: [variant],
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
  console.log('🚀 ~ product:', JSON.stringify(product.variants as Variant[]))
  console.log('🚀 ~ product:', groupVariantsByColor(product.variants as Variant[]))
  console.log('🚀 ~ product:', JSON.stringify(groupVariantsByColor(product.variants as Variant[])))
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [groupedVariants, setGroupedVariants] = useState<GroupedVariants[]>(
    groupVariantsByColor(product.variants as Variant[]),
  )
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string
  }>({})
  const [selectedVariant, setSelectedVariant] = useState<Variant>()

  const handleQuantity = (type: 'i' | 'd') => {
    if (type === 'd' && quantity > 1) {
      setQuantity(prev => prev - 1)
    }
    if (type === 'i' && quantity < stockNumber) {
      setQuantity(prev => prev + 1)
    }
  }

  const handleOptionSelect = (optionType: string, choice: string) => {
    setSelectedOptions(prev => ({ ...prev, [optionType]: choice }))
  }

  return (
    <div className={classes.container}>
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
            {groupedVariants?.map(choice => {
              // const disabled = !isVariantInStock({
              //   ...selectedOptions,
              //   [option.name!]: choice.description!,
              // })
              const disabled = true
              // const selected = selectedOptions[groupedVariants[0].color.title!] === choice.color.value
              const selected = false

              // const clickHandler = disabled
              //   ? undefined
              //   : () => handleOptionSelect(option.name!, choice.description!)

              return (
                <li
                  style={{
                    width: '2rem', // w-8 -> 8 divided by 4 = 2rem
                    height: '2rem', // h-8 -> 8 divided by 4 = 2rem
                    borderRadius: '9999px', // rounded-full -> full border radius
                    border: '1px solid #D1D5DB', // ring-1 ring-gray-300 -> 1px solid with gray color
                    position: 'relative',
                    backgroundColor: choice.color.value,
                    cursor: 'pointer',
                  }}
                  key={choice.color.title}
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
            }}
          >
            {groupedVariants?.map(choice => {
              // const disabled = !isVariantInStock({
              //   ...selectedOptions,
              //   [option.name!]: choice.description!,
              // })
              const disabled = false
              // const selected = selectedOptions[groupedVariants[0].color.title!] === choice.color.value
              const selected = false

              // const clickHandler = disabled
              //   ? undefined
              //   : () => handleOptionSelect(option.name!, choice.description!)

              return (
                <li
                  style={{
                    border: '1px solid #B1AFA7', // ring-1 ring-lama (assuming `lama` is #B1AFA7)
                    borderRadius: '0.375rem',     // rounded-md -> 0.375rem (6px)
                    paddingTop: '0.25rem',        // py-1 -> 0.25rem
                    paddingBottom: '0.25rem',     // py-1 -> 0.25rem
                    paddingLeft: '1rem',          // px-4 -> 1rem
                    paddingRight: '1rem',         // px-4 -> 1rem
                    fontSize: '0.875rem',         // text-sm -> 0.875rem (14px)
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    backgroundColor: selected ? '#f35c7a' : disabled ? '#FBCFE8' : 'white',
                    color: selected || disabled ? 'white' : '#f35c7a',
                    boxShadow: disabled ? 'none' : '',
                  }}
                  key={choice.color.title}
                >
                  {choice.color.title}
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      <h5 className={classes.title}>Choose a Quantity</h5>
      <div className={classes.quantityWrapper}>
        <div className={classes.quantityControls}>
          <button
            className={classes.decrementButton}
            onClick={() => handleQuantity('d')}
            disabled={quantity === 1}
          >
            <span>-</span>
          </button>
          {quantity}
          <button
            className={classes.incrementButton}
            onClick={() => handleQuantity('i')}
            disabled={quantity === stockNumber}
          >
            <span>+</span>
          </button>
        </div>

        {/* {stockNumber < 1 ? (
          <div className={classes.outOfStock}>Product is out of stock</div>
        ) : (
          <div className={classes.stockInfo}>
            Only <span className={classes.stockNumber}>{stockNumber} items</span> left!
            <br /> {"Don't"} miss it
          </div>
        )} */}

        <AddToCartButton
          product={product}
          quantity={quantity}
          className={classes.addToCartButton}
        />
      </div>
    </div>
  )
}

export default Add
