// Deprecated component, was planned for use at the bottom of LandingFeatures.jsx to dynamically show gem dropdowns
// Replaced with static images


export default function LandingFeaturesMapGems() {    
  return(
    <> 

      <div className="map-ruby">
        <div className="map-currency">
          <img src="assets/flaticons/gem_ruby.png" alt="Ruby - Food" />
          <div className="map-currency-content">
            <p>Create entries in the <b>Food</b> category to earn Rubies</p>
            <ul>Restauraunts</ul>
            <ul>Mom N Pop Shops</ul>
            <ul>Unique Cuisine</ul>
          </div>
        </div>
      </div>

      <div className="map-sapphire">
        <div className="map-currency">
          <img src="assets/flaticons/gem_sapphire.png" alt="Sapphire - Entertainment"/>
          <div className="map-currency-content">
            <p>Create entries in the <b>Entertainment</b> category to earn Sapphires</p>
            <ul>Escape Rooms</ul>
            <ul>Karaoke Lounges</ul>
            <ul>Live Music Venues</ul>
          </div>
        </div>
      </div>

      <div className="map-emerald">
        <div className="map-currency">
          <img src="assets/flaticons/gem_emerald.png" alt="Emerald - Outdoor Activity"/>
          <div className="map-currency-content">
            <p>Create entries in the <b>Outdoors</b> category to earn Emeralds</p>
            <ul>Hiking Trails</ul>
            <ul>Camping Spots</ul>
            <ul>Scenic Spots</ul>
          </div>
        </div>
      </div>

      <div className="map-topaz">
        <div className="map-currency">
          <img src="assets/flaticons/gem_topaz.png" alt="Topaz - Shopping"/>
          <div className="map-currency-content">
            <p>Create entries in the <b>Shopping</b> category to earn Topazs</p>
            <ul>Specialty Shops</ul>
            <ul>Street Markets</ul>
            <ul>Boutique Stores</ul>
          </div>
        </div>
      </div>

      <div className="map-amethyst">

      <div className="map-currency">
        <img src="assets/flaticons/gem_amethyst.png" alt="Amethyst - Nightlife"/>
        <div className="map-currency-content">
          <p>Create entries in the <b>Nightlife</b> category to earn Amethysts</p>
          <ul>Nightclubs</ul>
          <ul>Bars and Pubs</ul>
          <ul>Rooftop Venues</ul>
        </div>
        </div>
      </div>

      <div className="map-citrine">
        <div className="map-currency">
          <img src="assets/flaticons/gem_citrine.png" alt="Citrine - Services"/>
          <div className="map-currency-content">
            <p>Create entries in the <b>Services</b> category to earn Citrines</p>
            <ul>Barbers and Stylists</ul>
            <ul>Beauty Salons</ul>
            <ul>Custom Tailoring</ul>
          </div>
        </div>
      </div>




    </> 
  )
}
