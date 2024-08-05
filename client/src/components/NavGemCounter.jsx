

export default function NavGemCounter(props) {  
  console.log(`Our props in NavGemCounter: `, props);

  return(
    <div className="nav-currency-bar">
      <div className="nav-currency">
        <img src="assets/flaticons/gem_ruby.png"/>
        <p>Rubies: <b>3</b></p>
        <div className="nav-currency-content">
          <p>Create Entries in the <b>Food</b> category to earn Rubies</p>
        </div>
      </div>
      <div className="nav-currency">
        <img src="assets/flaticons/gem_sapphire.png"/>
        <p>Sapphires: <b>0</b></p>
        <div className="nav-currency-content">
          <p>Create Entries in the <b>Entertainment</b> category to earn Emeralds</p>
        </div>
      </div>
      <div className="nav-currency">
        <img src="assets/flaticons/gem_emerald.png"/>
        <p>Emeralds: <b>1</b></p>
        <div className="nav-currency-content">
          <p>Create Entries in the <b>Nature</b> category to earn Emeralds</p>
        </div>
      </div>
      <div className="nav-currency">
        <img src="assets/flaticons/gem_topaz.png"/>
        <p>Topazs: <b>2</b></p>
        <div className="nav-currency-content">
          <p>Create Entries in the <b>Shopping</b> category to earn Topazs</p>
        </div>
      </div>
      <div className="nav-currency">
        <img src="assets/flaticons/gem_amethyst.png"/>
        <p>Amethysts: <b>1</b></p>
        <div className="nav-currency-content">
          <p>Create Entries in the <b>Nightlife</b> category to earn Amethysts</p>
        </div>
      </div>
      <div className="nav-currency">
        <img src="assets/flaticons/gem_citrine.png"/>
        <p>Citrines: <b>1</b></p>
        <div className="nav-currency-content">
          <p>Create Entries in the <b>Services</b> category to earn Citrines</p>
        </div>
      </div>
    </div> 
  )
}
