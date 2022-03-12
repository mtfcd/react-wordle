import { useState } from 'react'
import { Cell } from '../grid/Cell'
import { Keyboard } from '../keyboard/Keyboard'
import { BaseModal } from './BaseModal'

import { unicodeSplit } from '../../lib/words'
import { createProblem } from '../../lib/api'
import { default as GraphemeSplitter } from 'grapheme-splitter'

type InputRowProps = {
  input: string
}

export const InputRow = ({input}: InputRowProps) => {
  const classes = `flex justify-center mb-1`
  const splitInput = unicodeSplit(input);
  return (
    <div className={classes}>
      {splitInput.map((letter, i) => (
        <Cell key={i} value={letter} />
      ))}
      {
        <Cell key={splitInput.length} />
      }
    </div>
  )
}


type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const CreateModal = ({ isOpen, handleClose }: Props) => {
  const [input, setInput] = useState('');
  const [problemURL, setProblemURL] = useState('');

  const onChar = (value: string) => {
    setInput(`${input}${value}`)
  }

  const onDelete = () => {
    setInput(
      new GraphemeSplitter().splitGraphemes(input).slice(0, -1).join('')
    )
  }

  const onEnter = async () => {
    const res = await createProblem(input);
    const url = `${window.location.origin}${res.data}`;
    setProblemURL(url)
  }

  return (
    <BaseModal title="Create a Problem" isOpen={isOpen} handleClose={handleClose}>
      <div className="pt-2 px-1 pb-8 md:max-w-7xl w-full mx-auto sm:px-6 lg:px-8 flex flex-col grow">
        <div className="pb-6 grow">
          <InputRow input={input}/>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-300">{problemURL}</p>
        <Keyboard
          onChar={onChar}
          onDelete={onDelete}
          onEnter={onEnter}
          guesses={[]}
          isRevealing={false}
        />
      </div>
    </BaseModal>
  )
}
