

export default function NavGemCounter(props) {  
  console.log(`Our props in NavGemCounter: `, props);

  return(
    <div className="nav-currency-bar">
      <div className="nav-currency">
        <img src="assets/flaticons/gem_ruby.png"/>
        <p>Rubies: <b>3</b></p>
      </div>
      <div className="nav-currency">
        <img src="assets/flaticons/gem_sapphire.png"/>
        <p>Sapphires: <b>0</b></p>
      </div>
      <div className="nav-currency">
        <img src="assets/flaticons/gem_emerald.png"/>
        <p>Emeralds: <b>1</b></p>
      </div>
      <div className="nav-currency">
        <img src="assets/flaticons/gem_topaz.png"/>
        <p>Topazs: <b>2</b></p>
      </div>
      <div className="nav-currency">
        <img src="assets/flaticons/gem_amethyst.png"/>
        <p>Amethysts: <b>1</b></p>
      </div>
      <div className="nav-currency">
        <img src="assets/flaticons/gem_citrine.png"/>
        <p>Citrines: <b>1</b></p>
      </div>
    </div> 
  )
}
