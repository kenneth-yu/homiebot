const commands = [
	{
		name: 'ping',
		description: 'Replies with Pong!',
	},
    {
        name: 'time',
        description: 'Replies with the current time in EST',
    },
    {
        name: 'affixes',
        description: 'Replies with the current M+ affixes',
    },
    {
        name: 'affix-details',
        description: 'Replies with an explanation of the current M+ affixes',
    }
];

exports.commands = commands;