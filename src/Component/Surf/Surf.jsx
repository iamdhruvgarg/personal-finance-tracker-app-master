import { Form, Input } from 'antd';
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';

const Surf = () => {
    const [search,setSearch]=useState("");
    const user=useAuthState(auth)
  return (
    <div className="navbar">
    
      <h2 className="title">
        H!, Welcome Back {} 
        <span style={{ color: "var(--theme)" }}>Finance Tracker</span>
      </h2>
      <Form>
        <Input
          label={"You Want is here..."}
          type={"text"}
          state={search}
          setState={setSearch}
          placeholder={"Search Here..."}
        />
        </form>
        </div>
  )
}

export default Surf