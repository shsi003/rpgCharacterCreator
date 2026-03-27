document.addEventListener("DOMContentLoaded", () => {

//Today we will attempt to make an app that creates and stores rpg character sheets

//Universal constants for character creator

const nameInput = document.getElementById("nameInput");
const classInput = document.getElementById("classInput");
const raceInput = document.getElementById("raceInput");

const createCharacterBtn = document.getElementById("createCharacterBtn");

const createdCharactersSection = document.getElementById("createdCharactersSection");



//reusable functions
	
	//logs input
	const logInput = () => {
		
			console.log(`
					name:${nameInput.value}
					class: ${classInput.value}
					race:${raceInput.value}`
					
					)

			return{
				name: nameInput.value,
				race: raceInput.value,
				class: classInput.value,
				id: Date.now() //assigns unique Id for fetching, storing and deleting
			}		
	}

	//Get the rawData for generated heroes from storage
	const rawData = JSON.parse(localStorage.getItem("rpgParty")) || [];




	//Save heroes to storage
	const saveHeroToStorage = (hero) => {

		

		//Pushes hero object to rawData
		rawData.push(hero);

		//Save to browser memory
		localStorage.setItem("rpgParty", JSON.stringify(rawData));

		//logs saved hero in the console
		console.log(`Hero: ${hero.name}, ID: ${hero.id} tucked into storage`);

	}

	console.log(rawData);


	//Function for deleting heroes, to be used in delete button
	const removeHero = (idToDelete) => {
			
		//reset the party array to include everything EXCEPT the chosen hero
		party = party.filter(hero => hero.id !== idToDelete);

		
		//Save the updated list
		localStorage.setItem("rpgParty", JSON.stringify(party));


		//refresh screen
		renderParty();


	}



	//Function for adding beginner class Skills after characters are made
	const addBeginnerClassSkills = (hero) => {
		switch (hero.job) {
			case "Mage":
				return Object.assign({}, hero, {
					ability:'Spiritual glow: heightened stats for mana attacks and total mana',
					hp: 120,
					mana: 150,


				});
				


			case "Warrior":	
				return Object.assign({}, hero, {
					ability: 'Iron heart: higher stats for physical attacks and total health',
					hp: 180,
					mana: 60

				});




			case "Thief":
				return Object.assign({}, hero, {
					ability: 'Swift: If met with a foe of the same or lower level, the thief always dodges the first strike',
					hp: 140,
					mana: 75

				});	

			default:
				return hero;	
		}
	}






	//Establish "party" section the bridge between rawData and renderParty, where class skills are applied
	let party = rawData.map(hero => addBeginnerClassSkills(hero));








	//Render heroes from storage
	const renderParty = () => {

		createdCharactersSection.innerHTML = "";

		party.forEach(hero => {
			const characterSheet = document.createElement('div');
			characterSheet.className = "hero-card";

			characterSheet.innerHTML = `
			<h3>${hero.name}</h3>
			<h3>race: ${hero.race} | class: ${hero.class}</h3>
			<h3>Stats</h3>
			<h4>Ability: ${hero.ability}</h4>
			<h4>hp: ${hero.hp}</h4>
			<h4>mana: ${hero.mana}</h4>
			<button class="delete-btn">Delete Character</button>
			`
			;

			createdCharactersSection.appendChild(characterSheet);

			const deleteBtn = characterSheet.querySelector(".delete-btn");
			deleteBtn.addEventListener('click', () => {
				removeHero(hero.id); //appends delete functionality to button
			})

		})
	}










//Testing creation display
createCharacterBtn.addEventListener('click', (e) => {
	e.preventDefault(); //Prevents default behaviour


	//Assigns logged input to a variable
	const newHero = logInput();

	
	
	saveHeroToStorage(newHero); //Passes logged info into storage
	renderParty(); //fetches hero from storage and displays them

	




	

})


renderParty();


})

