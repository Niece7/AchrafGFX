import discord
from discord.ext import commands
from discord_slash import SlashCommand, SlashContext

# تهيئة البوت
intents = discord.Intents.default()
bot = commands.Bot(command_prefix='!', intents=intents)
slash = SlashCommand(bot, sync_commands=True)  # تمكين سلاش كوماند

# قائمة لتخزين التصاميم
designs = []

# أمر لإضافة تصميم جديد
@bot.command(name='add_design')
async def add_design(ctx, title, description, image_url):
    design = {
        'title': title,
        'description': description,
        'image_url': image_url,
        'channel': ctx.channel.id
    }
    designs.append(design)
    await ctx.send('تمت إضافة التصميم بنجاح!')

# سلاش كوماند لعرض التصاميم
@slash.slash(name='show_designs', description='عرض قائمة التصاميم')
async def show_designs(ctx: SlashContext):
    response = ''
    for design in designs:
        response += f'**العنوان:** {design["title"]}\n'
        response += f'**الوصف:** {design["description"]}\n'
        response += f'**رابط الصورة:** {design["image_url"]}\n\n'
    await ctx.send(response)

# تسجيل تسجيل الدخول للبوت
@bot.event
async def on_ready():
    print(f'Logged in as {bot.user}!')

# تسجيل البوت باستخدام التوكن الخاص بك
bot.run('YOUR_TOKEN')
