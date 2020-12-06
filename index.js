const Discord = require('discord.js');
const {prefix} = require('./config.json');
const client = new Discord.Client();
const ytdl = require('ytdl-core');
const { on } = require('process');

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
    console.log('Ready!');

});

// login to Discord with your app's token
client.login(process.env.BOT_TOKEN);





client.on('message', async message => {

    if (message.member.voice.channel) {


        if (!message.content.startsWith(prefix) || message.author.bot) return;

        const args = message.content.slice(prefix.length).trim().split(' ');
        const command = args.shift().toLowerCase();






        if (command === 'play') {
            
                if (message.member.voice.channel) {
                    const voiceChannel = message.member.voice.channel;
                    if (!voiceChannel) {
                        message.channel.send('Please be in a voice channel first!');
                        return;
                    }
                    const connection = await voiceChannel.join();

                    const stream = ytdl(args[0], {filter: 'audioonly', dlChunkSize:0})
                    .on('info', (info)=>{
                        client.user.setActivity(info.videoDetails.title, {type: 'LISTENING', url: args[0]});
                        //message.channel.send(':radio: Playing: ' + info.videoDetails.title);
                    });
                    const dispatcher = connection.play(stream)/*.setVolumeDecibels(-15)*/;
                    

                    


               

            } 
            
        }












    }
});