import React from "react";
import EnterPlan from "./client/components/PlanEntry/EnterPlan";
import PlanMainMenu from "./client/components/PlanEntry/PlanMainMenu";
import "./App.css";

const thePlanTable = [];
const App = () => {
  /*
   Create mock data to test functionality
   JSON Data
*/

  const mockData = [
    `Detract yet delight written farther his general. 
      If in so bred at dare rose lose good. Feel and make two real miss use easy. 
      Celebrated delightful an especially increasing instrument am. 
      Indulgence contrasted sufficient to unpleasant in in insensible favourable. 
      Latter remark hunted enough vulgar say man. Sitting hearted on it without me`,
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
      Ut enim ad minim veniam, quis nostrud exercitation ullamco 
      laboris nisi ut aliquip ex ea commodo consequat. 
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
      fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
      sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    `Old there any widow law rooms. Agreed but expect repair she nay sir silent person. 
      Direction can dependent one bed situation attempted. His she are man their spite avoid. 
      Her pretended fulfilled extremely education yet. 
      Satisfied did one admitting incommode tolerably how are.`,
    `Barton did feebly change man she afford square add. Want eyes by neat so just must. Past draw tall up face show rent oh mr. 
      Required is debating extended wondered as do. 
      New get described applauded incommode shameless out extremity but. 
      Resembled at perpetual no believing is otherwise sportsman. 
      Is do he dispatched cultivated travelling astonished. 
      Melancholy am considered possession on collecting everything.`,

    // http://www.richkni.co.uk/php/text/text.php

    `Now is the winter of our discontent
       Made glorious summer by this sun of York;
       And all the clouds that lour'd upon our house
       In the deep bosom of the ocean buried.
       Now are our brows bound with victorious wreaths;
       Our bruised arms hung up for monuments;`,
    `Our stern alarums changed to merry meetings,
       Our dreadful marches to delightful measures.
       Grim-visaged war hath smooth'd his wrinkled front;
       And now, instead of mounting barded steeds 
       To fright the souls of fearful adversaries,
       He capers nimbly in a lady's chamber
       To the lascivious pleasing of a lute.`,
    `But I, that am not shaped for sportive tricks,
       Nor made to court an amorous looking-glass;
       I, that am rudely stamp'd, and want love's majesty
       To strut before a wanton ambling nymph;
       I, that am curtail'd of this fair proportion;`,
    `Fog everywhere. Fog up the river, where it flows among green aits and meadows; 
       fog down the river, where it rolls deified among the tiers of shipping 
       and the waterside pollutions of a great (and dirty) city. Fog on the Essex marshes, 
       fog on the Kentish heights. Fog creeping into the cabooses of collier-brigs; 
       fog lying out on the yards and hovering in the rigging of great ships; 
       fog drooping on the gunwales of barges and small boats.`,
    `Fog in the eyes and throats of ancient Greenwich pensioners, 
       wheezing by the firesides of their wards; fog in the stem and bowl of the afternoon pipe of 
       the wrathful skipper, down in his close cabin; fog cruelly pinching the toes and fingers of his 
       shivering little apprentice boy on deck. Chance people on the bridges peeping over the parapets 
       into a nether sky of fog, with fog all round them, as if they were up in a balloon and hanging 
       in the misty clouds.`,
    `yes and those handsome Moors all in white and turbans like kings asking you to sit down 
       in their little bit of a shop and Ronda with the old windows of the posadas 2 glancing eyes 
       a lattice hid for her lover to kiss the iron and the wineshops half open at night and 
       the castanets and the night we missed the boat at Algeciras the watchman going about serene with 
       his lamp and O that awful deepdown torrent O and the sea the sea crimson sometimes like fire 
       and the glorious sunsets and the figtrees in the Alameda gardens`,
    `yes and all the queer little streets and the pink and blue and yellow houses and the rosegardens 
       and the jessamine and geraniums and cactuses and Gibraltar as a girl where I was a Flower of 
       the mountain yes when I put the rose in my hair like the Andalusian girls used or shall I wear 
       a red yes and how he kissed me under the Moorish wall and I thought well as well him as another 
       and then I asked him with my eyes to ask again yes and then he asked me would I yes to say yes 
       my mountain flower and first I put my arms around him yes and drew him down to me so he could feel 
       my breasts all perfume yes and his heart was going like mad and yes I said yes I will Yes.`,
    `And Eurypylus, son of Euaemon, killed Hypsenor, the son of noble Dolopion, who had been made priest 
       of the river Scamander, and was honoured among the people as though he were a god. Eurypylus gave him 
       chase as he was flying before him, smote him with his sword upon the arm, and lopped his strong hand 
       from off it. The bloody hand fell to the ground, and the shades of death, with fate that no man can 
       withstand, came over his eyes. Thus furiously did the battle rage between them. `,
    `As for the son of Tydeus, you could not say whether he was more among the Achaeans or the Trojans. 
       He rushed across the plain like a winter torrent that has burst its barrier in full flood; no dykes, 
       no walls of fruitful vineyards can embank it when it is swollen with rain from heaven, but in 
       a moment it comes tearing onward, and lays many a field waste that many a strong man hand has 
       reclaimed- even so were the dense phalanxes of the Trojans driven in rout by the son of Tydeus, 
       and many though they were, they dared not abide his onslaught.`,
    `It is Spring, moonless night in the small town, starless and bible-black, the cobblestreets silent 
       and the hunched, courters'-and- rabbits' wood limping invisible down to the sloeblack, slow, black, 
       crowblack, fishingboat-bobbing sea. The houses are blind as moles (though moles see fine to-night 
       in the snouting, velvet dingles) or blind as Captain Cat there in the muffled middle by the pump 
       and the town clock, the shops in mourning, the Welfare Hall in widows' weeds. And all the people of 
       the lulled and dumbfound town are sleeping now.`,
  ];

  // Create six mock plans
  for (let i = 1; i <= 6; i++) {
    const fiveParts = [];
    // Five: for S M A R T
    for (let j = 1; j <= 5; j++) {
      const randomElement =
        mockData[Math.floor(Math.random() * mockData.length)];
      fiveParts.push(randomElement);
    }
    thePlanTable[i - 1] = fiveParts;
  }

  const primaryKeys = [];
  // Create six mock primary keys - FORMAT USERID.YYMMDD.HHMMSS
  for (let i = 1; i <= 6; i++) {
    let monthNum = String(Math.floor(Math.random() * 12 + 1)).padStart(2, "0");
    let dayNum = String(Math.floor(Math.random() * 28 + 1)).padStart(2, "0");
    primaryKeys[i - 1] = `USERNAME.2022${monthNum}${dayNum}.`;
  }
  primaryKeys[0] += "193943";
  primaryKeys[1] += "111125";
  primaryKeys[2] += "040657";
  primaryKeys[3] += "060649";
  primaryKeys[4] += "193749";
  primaryKeys[5] += "213939";
  console.log(primaryKeys.sort().reverse()) // Descending order
  console.log(primaryKeys)
  return (
    <div className="App">
      <PlanMainMenu thePrimaryKeys={primaryKeys} thePlanTable={thePlanTable} />
      <EnterPlan />
    </div>
  );
};

export default App;
