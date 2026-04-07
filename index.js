document.addEventListener("DOMContentLoaded", () => {

//Today we will attempt to make an app that creates and stores rpg character sheets







//Universal constants for character creator

const nameInput = document.getElementById("nameInput");
const classInput = document.getElementById("classInput");
const raceInput = document.getElementById("raceInput");

const createCharacterBtn = document.getElementById("createCharacterBtn");

const createdCharactersSection = document.getElementById("createdCharactersSection");





	//Get the rawData for generated heroes from storage
	let rawData = JSON.parse(localStorage.getItem("rpgParty")) || [];



	//The 'showroom' where the chosen characters will be displayed
	let displayArray = [];



	
	


//reusable functions
	
	//logs input
	const logInput = () => {
		
			console.log(`
					name:${nameInput.value}
					class: ${classInput.value}
					race:${raceInput.value}`
					
					)

			return{						//Outputs character stats after user input
				name: nameInput.value,
				race: raceInput.value,
				class: classInput.value,
				id: Date.now(), //assigns unique Id for fetching, storing and deleting
				hp: 0,
				mana: 0,
				ability: '',
			}		
	}






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
		rawData = rawData.filter(hero => hero.id !== idToDelete);
		displayArray = displayArray.filter(hero => hero.id !== idToDelete);
		
		//Save the updated list
		localStorage.setItem("rpgParty", JSON.stringify(rawData));


	
		//refresh screen
		renderParty();

	}





	//function for adding race stats

	const addRaceStats = (hero) => {
		switch (hero.race) {
			case "Human":
				return Object.assign({}, hero, {
					hp: (hero.hp || 0 )+ 40 ,
					mana: (hero.mana || 0) + 30 ,
					trait: '',
				});


			case "Elf":
				return Object.assign({}, hero, {
					hp: (hero.hp || 0) + 30 ,
					mana: (hero.mana || 0) + 40 ,
					trait: '',

				});


			
			case "Orc":
				return Object.assign({}, hero, {
					hp: (hero.hp || 0) + 40 ,
					mana: (hero.mana || 0) + 20 ,
					trait: '',

				});


			case "Dwarf":
				return Object.assign({}, hero, {
					hp: (hero.hp || 0) + 50 ,
					mana: (hero.mana || 0) + 20 ,
					trait: '',

				});




			default:
				return hero;
		}
	}



	//Function for adding beginner class Skills after characters are made
	const addBeginnerClassSkills = (hero) => {
		switch (hero.class) {
			case "Mage":
				return Object.assign({}, hero, {
					ability:'Spiritual glow: heightened stats for mana attacks and total mana',
					hp: (hero.hp || 0) + 120,
					mana: (hero.mana || 0) + 150,


				});
				


			case "Warrior":	
				return Object.assign({}, hero, {
					ability: 'Iron heart: higher stats for physical attacks and total health',
					hp: (hero.hp || 0) + 180,
					mana: (hero.mana || 0) +  60

				});




			case "Thief":
				return Object.assign({}, hero, {
					ability: 'Swift: If met with a foe of the same or lower level, the thief always dodges the first strike',
					hp: (hero.hp || 0) + 140,
					mana: (hero.mana || 0) +  75

				});	

			default:
				return hero;	
		}
	}



	//hydrate and fill in hero data
	const hydrateHero = (hero) => {
		

			//sets all hero stats to 0
			const skeleton = {...hero, mana: 0, hp: 0};

			//adds stats based on chosen class and race
			return addBeginnerClassSkills(addRaceStats(skeleton));

	}


	//sending each hero through the processor
	const hydrateAll = () => {
		
		displayArray = rawData.map(hero => hydrateHero(hero));
	}













	//Render heroes from storage
	const renderParty = () => {

		createdCharactersSection.innerHTML = "";

		displayArray.forEach(hero => {
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
				console.log(`hero: ${hero.name} id: ${hero.id} has been deleted!`) //Logs the delete
			})

		})
	}









//Testing creation display
createCharacterBtn.addEventListener('click', (e) => {
	e.preventDefault(); //Prevents default behaviour


	//Assigns logged input to a variable
	const newHero = logInput();

	
	
	saveHeroToStorage(newHero); //Passes logged info into storage


	const hydratedNewHero = hydrateHero(newHero);
	displayArray.push(hydratedNewHero);
	renderParty(); //fetches hero from storage and displays them

	




	

})


//For intialization
hydrateAll();
renderParty();



})

