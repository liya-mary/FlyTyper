import Typer from "./Typer"
import Navbar from "./Navbar"
import { useNavigate } from 'react-router-dom';



function Home() {
    let navigate = useNavigate();

    const buttonHandler = () => {
        console.log("button clicked");
        navigate('/soloplay');
    }

    return (
        <div className="dashboard-container">
            {/* <Typer/> */}

            <section className="hero is-white is-fullheight">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns  is-vcentered reverse-columns">
                            <div className="column
          is-10-mobile 
          is-10-tablet 
          is-5-desktop 
          is-5-widescreen 
          is-5-fullhd " data-aos="fade-down">
                                <h1 className="title titled is-1 mb-6">
                                    Welcome to Fly Typer
                                </h1>
                                <h3 className="subtitle"> Increase your typing speed while racing against others </h3>
                                <div className="buttons">
                                    <button className="button is-yellow" onClick={buttonHandler}>Solo Play</button>
                                    <button className="button">Quick play</button>
                                </div>
                            </div>
                            <div data-aos="fade-right" className="column
          is-10-mobile 
          is-10-tablet 
          is-4-desktop 
          is-7-widescreen 
          is-4-fullhd is-offset-1-fullhd">
                                <figure className="image is-square">
                                </figure>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Home
