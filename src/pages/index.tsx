import { useRef } from "react"

import styled from '../styles/home.module.scss'

export default function Home() {

  const inputRef = useRef<HTMLInputElement>(null)

  function focus(){
    inputRef.current?.focus()
  }

  return (
    <>
      <input ref={inputRef} />
      <button className={styled.title} onClick={focus}>Focus</button>
    </>
  )
}
