import React from 'react'
import GroupFeed from '@components/GroupFeed'

const Home = () => {
  return (
    <section className='w-full flex-center flex-col'>
      <h1 className='head_text text-center'>Create & Rank <br />
        <span className='blue_gradient text-center'>
          Yourself and Friends
        </span>
      </h1>
      <p className='desc text-center'>If you think you know your friends the way they think
        they know you, guess again.</p>

      <GroupFeed />
    </section>
  )
}

export default Home