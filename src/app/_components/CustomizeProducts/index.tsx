'use client'

import { useEffect, useState } from 'react'
import Add from '../Add'
import classes from './index.module.scss';

const CustomizeProducts = ({
  productId,
  variants,
  productOptions,
}: {
  productId: string
  variants: any[]
  productOptions: any[]
}) => {
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string
  }>({})
  const [selectedVariant, setSelectedVariant] = useState<any>()

  useEffect(() => {
    const variant = variants.find(v => {
      const variantChoices = v.choices
      if (!variantChoices) return false
      return Object.entries(selectedOptions).every(([key, value]) => variantChoices[key] === value)
    })
    setSelectedVariant(variant)
  }, [selectedOptions, variants])

  const handleOptionSelect = (optionType: string, choice: string) => {
    setSelectedOptions(prev => ({ ...prev, [optionType]: choice }))
  }

  const isVariantInStock = (choices: { [key: string]: string }) => {
    return variants.some(variant => {
      const variantChoices = variant.choices
      if (!variantChoices) return false

      return (
        Object.entries(choices).every(([key, value]) => variantChoices[key] === value) &&
        variant.stock?.inStock &&
        variant.stock?.quantity &&
        variant.stock?.quantity > 0
      )
    })
  }

  return (
    <div className={classes.container}>
      {productOptions.map(option => (
        <div className={classes.optionGroup} key={option.name}>
          <h4 className={classes.optionTitle}>Choose a {option.name}</h4>
          <ul className={classes.choices}>
            {option.choices?.map(choice => {
              const disabled = !isVariantInStock({
                ...selectedOptions,
                [option.name!]: choice.description!,
              })

              const selected = selectedOptions[option.name!] === choice.description

              const clickHandler = disabled
                ? undefined
                : () => handleOptionSelect(option.name!, choice.description!)

              return option.name === 'Color' ? (
                <li
                  className={classes.colorChoice}
                  style={{
                    backgroundColor: choice.value,
                    cursor: disabled ? 'not-allowed' : 'pointer',
                  }}
                  onClick={clickHandler}
                  key={choice.description}
                >
                  {selected && (
                    <div className={classes.colorChoiceSelected} />
                  )}
                  {disabled && (
                    <div className={classes.colorChoiceDisabled} />
                  )}
                </li>
              ) : (
                <li
                  className={classes.sizeChoice}
                  style={{
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    backgroundColor: selected ? '#f35c7a' : disabled ? '#FBCFE8' : 'white',
                    color: selected || disabled ? 'white' : '#f35c7a',
                    boxShadow: disabled ? 'none' : '',
                  }}
                  key={choice.description}
                  onClick={clickHandler}
                >
                  {choice.description}
                </li>
              )
            })}
          </ul>
        </div>
      ))}
      <Add
        productId={productId}
        variantId={selectedVariant?._id || '00000000-0000-0000-0000-000000000000'}
        stockNumber={selectedVariant?.stock?.quantity || 0}
      />
    </div>
  )
}

export default CustomizeProducts
