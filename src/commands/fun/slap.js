module.exports = {
  name: "slap",
  description: "slaps someone",
  cooldown: 5,
  category: "INTERACTIONS",
  botPermissions: ["EmbedLinks"],
  command: {
    enabled: true,
    usage: "<user>",
    minArgsCount: 1,
  },
  slashCommand: {
    enabled: true,
    options: [
      {
        name: "user",
        description: "user to slap",
        type: ApplicationCommandOptionType.User,
        required: true,
      },
    ],
  },

  async messageRun(message, args) {
    const user = message.mentions.users.first();
    if (!user) {
      return message.safeReply(`Please mention a user to slap.`);
    }
    const response = await getSlap(user);
    return message.safeReply(response);
  },

  async interactionRun(interaction) {
    const user = interaction.options.getUser("user");
    const response = await getSlap(user);
    await interaction.followUp(response);
  },
};

async function getSlap(user) {
  const response = await getJson("https://some-random-api.com/animu/face-palm");
  if (!response.success) return MESSAGES.API_ERROR;

  const imageUrl = response.data?.image;
  const embed = new EmbedBuilder()
    .setColor(EMBED_COLORS.TRANSPARENT)
    .setImage(imageUrl)
    .setDescription(`You slapped ${user.tag}!`)
    .setFooter({ text: `Requested by ${interaction.user.tag}` });

  return { embeds: [embed] };
}
