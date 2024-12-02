import styles from "./Main.module.scss"

const Main = () => {
    return ( <main className="section-title">
        <h1  style={{marginLeft: "60px"}}>LAUNCHING SOON!</h1>
        <h1  style={{marginLeft: "60px"}}>STAY TUNED</h1>
        <p className="green"  style={{marginLeft: "65px"}}>Drop your email for immediate updates:</p>
        <input style={{width:'540px', height: '54px', marginLeft:"70px", marginBottom: "20px"}}></input>
      </main>
    )
   
}

export default Main;