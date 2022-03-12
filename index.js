const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const dotenv = require('dotenv');
dotenv.config();
const TOKEN = process.env['TOKEN'];
const CLIENT_ID = process.env['CLIENT_ID']
const GUILD_ID = process.env['GUILD_ID']
const commands = require('./commands.js')
const schedule = require('node-schedule');
const moment = require('moment');
const helper = require('./helper.js')
const fetchHelper = require('./fetchHelper.js')

let daylightSavings = helper.checkDST() === -5 ? true : false

//Enable slash commands --------------------------------------------------------------------------------------
const rest = new REST({ version: '9' }).setToken(TOKEN);
(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands.commands });

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();
//Enable slash commands END --------------------------------------------------------------------------------------

const { Client, GatewayIntentBits, Intents } = require('discord.js');
const client = new Client({ intents: ['GUILDS'] });

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async (interaction) => {
	// if (!interaction.isCommand()) return;

	// if (interaction.commandName === 'ping') {
	// 	await interaction.reply('Pong!');
	// }
	
	// if(interaction.commandName === 'time'){
	// 	await interaction.reply(`It is currently ${moment().utcOffset(-5).format('LT')} EST`)
	// }
	if (!interaction.isCommand()) return;
	else{
		switch(interaction.commandName){
			case 'affixes':
				fetchHelper.getAffixes().then(async res => {
					await interaction.reply(`The current Mythic+ Affixes are ${res.title}.`)
				})
				break;
			case 'affix-details':
				let affixDetails = ''
				fetchHelper.getAffixes().then(async res => {
					res.affix_details.forEach(affix => {
						affixDetails += `${affix.name}: ${affix.description}\n`
					})
					await interaction.reply(affixDetails)
				})
				break;
			case 'time':
				await interaction.reply(`It is currently ${moment().utcOffset(daylightSavings ? -5 : -4).format('LT')} EST`)
				break;
			case '!date': 
					message.channel.send(moment().utcOffset(daylightSavings ? -5 : -4).format('LL'))
					break;
		}
	}
});

client.login(TOKEN);