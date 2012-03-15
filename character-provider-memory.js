var characterCounter = 1;

CharacterProvider = function(){};
CharacterProvider.prototype.dummyData = [];
CharacterProvider.prototype.findAll = function(callback){
	callback(null, this.dummyData);
};
CharacterProvider.prototype.findById = function(id, callback){
	var result = null;
	for (var i = 0; i < this.dummyData.length; i++) {
		var entry = this.dummyData[i];
		if (entry._id == id){
			result = entry;
			break;
		}
	}

	callback(null, result);
};
CharacterProvider.prototype.save = function(characters, callback){
	var character = null;

	if (typeof characters.length == "undefined") {
		characters = [characters];
	}

	for (var i = 0; i < characters.length; i++) {
		character = characters[i];
		character._id = characterCounter++;
		character.created_at = new Date();
		character.covenants = character.covenants || [];


		this.dummyData[this.dummyData.length] = character;
	}

	callback(null, characters);
};

new CharacterProvider().save([
	{
		name: "Apollo",
		clan: "nosferatu",
		covenants: ["circle", "ordo"],
		attributes:{intelligence: 2, wits: 3, resolve: 4, strength: 2, dexterity: 3, stamina: 4, presence: 2, manipulation: 3, composure: 4 },
		skills:{
			academics: {
				value:1,
				specialties:[]
			},
			computer: {
				value:1,
				specialties:[]
			},
			crafts: {
				value:1,
				specialties:[]
			},
			investigation: {
				value:1,
				specialties:[]
			},
			medicine: {
				value:1,
				specialties:[]
			},
			occult: {
				value:1,
				specialties:[]
			},
			politics: {
				value:1,
				specialties:[]
			},
			science: {
				value:1,
				specialties:[]
			},
			athletics: {
				value:1,
				specialties:[]
			},
			brawl: {
				value:1,
				specialties:[]
			},
			drive: {
				value:1,
				specialties:[]
			},
			firearms: {
				value:1,
				specialties:[]
			},
			larceny: {
				value:1,
				specialties:[]
			},
			stealth: {
				value:1,
				specialties:[]
			},
			survival: {
				value:1,
				specialties:[]
			},
			weaponry: {
				value:1,
				specialties:[]
			},
			animalKen: {
				value:1,
				specialties:[]
			},
			empathy: {
				value:1,
				specialties:[]
			},
			expression: {
				value:1,
				specialties:[]
			},
			intimidation: {
				value:1,
				specialties:[]
			},
			persuasion: {
				value:1,
				specialties:[]
			},
			socialize: {
				value:1,
				specialties:[]
			},
			streetwise: {
				value:1,
				specialties:[]
			},
			subterfuge: {
				value:1,
				specialties:[]
			}
		},
		merits:[{name:"Striking Looks", value:4},{name:"Allies", value:3, description:"Macumbeiros"}],
		disciplines:[
			{name:"nightmare", level:3},
			{name:"vigor", level:2},
			{name:"cruac", level:2, rituals:[{name:"Pangs of Proserpina", level:1},{name:"Rigor Mortis",level:2}]},
			{name:"coils of the dragon",level:7,coils:[{name:"coil of blood",level:2},{name:"coil of banes",level:2},{name:"coil of the beast",level:3}]}
		],
		humanity:5,
		derangements:[{name:"narcisism", humanity:6}],
		willpower:5,
		vitae:8,
		bloodPotence:3,
		health:{
			max:8,
			bash:2,
			lethal:3,
			aggr:1
		},
		assets:[
			{skill:"crafts",level:2},
			{skill:"weaponry",level:3},
			{skill:"streetwise",level:4},
			{skill:"larceny",level:5}
		]
	}
], function(error,characters){});

exports.CharacterProvider = CharacterProvider;