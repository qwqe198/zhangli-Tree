addLayer("f", {
    name: "复制点", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "f", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),

        }
    },
    color: "#3300ffff",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "复制点", // Name of prestige currency
    baseResource: "点数", // Name of resource prestige is based on
    baseAmount() { return player.points }, // Get the current amount of baseResource
    type: "normal", // normal:膨胀资源层 static: 非膨胀资源层 使用时要加双引号
    exponent: 0.0001, // Prestige currency exponent 初始值0.5
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)

        return mult
    },

    gainExp() { // Calculate the exponent on main currency from bonuses
exp = new Decimal(1)


        return exp
    },
 m() { 
m = new Decimal(1.01)
if(hasUpgrade("f",22))m=m.mul(1.005)
if(hasUpgrade("p",32))m=m.pow(upgradeEffect("p",32))
if(hasUpgrade("f",24))m=m.pow(1.2)
m=m.pow(buyableEffect("a",12))
        return m
    },
milestones: {
    1: {
        requirementDescription: "1复制点",
        effectDescription: "禁用复制点重置",
        done() { return player.f.points.gte(1) }
    },
 
},
upgrades: {
   
11: {
            description: "点数获取基于复制点增加",
            cost() { return new Decimal(2) },
            unlocked() { return true },
effect(){
                    let b=player.f.points.add(10).log10()
                if(hasUpgrade("f",21)) b=b.pow(buyableEffect("a",12))
if(hasUpgrade("f",21)) b=b.pow(buyableEffect("p",12))
if(hasUpgrade("f",25)) b=b.pow(upgradeEffect("f",23))
                    return b;
                },
                effectDisplay() { return format(this.effect())+"倍" },
        },
12: {
            description: "张力点获取基于复制点增加",
            cost() { return new Decimal(5) },
            unlocked() { return true },
effect(){
                    let b=player.f.points.add(10).log10()
                 
                    return b;
                },
                effectDisplay() { return format(this.effect())+"倍" },
        },
13: {
            description: "降低p第2个购买项价格",
            cost() { return new Decimal(1e7) },
            unlocked() { return true },

        },
14: {
            description: "10.张力源自于叠加指数 点数获取变成原来的（冲击点）次方",
            cost() { return new Decimal(1e9) },
            unlocked() { return true },
effect(){
                    let b=player.a.points;
                 
                    return b;
                },
                effectDisplay() { return "^"+format(this.effect())},
        },
15: {
            description: "降低p第1个购买项价格",
            cost() { return new Decimal(1e13) },
            unlocked() { return true },

        },
21: {
            description: "12.两个加成一个 双倍张力 p和a购买项12加成升级11效果",
            cost() { return new Decimal(1e17) },
            unlocked() { return true },

        },
22: {
            description: "14 全部都有乘数，更多张力 点数，张力点，冲击碎片x10，复制乘数x1.005",
            cost() { return new Decimal(1e24) },
            unlocked() { return true },

        },
23: {
            description: "15.膨胀 当然是张力的一种体现 复制点增加p购买项11效果",
            cost() { return new Decimal(1e32) },
            unlocked() { return true },
effect(){
                    let b=player.f.points.add(10).log10().add(10).log10()
                 
                    return b;
                },
                effectDisplay() { return "^"+format(this.effect())},
        },
24: {
            description: "16 全部都有指数，极多张力 点数，张力点，冲击碎片^1.05，复制乘数^1.2",
            cost() { return new Decimal(1e60) },
            unlocked() { return true },

        },
25: {
            description: "17三重张力 升级23加成升级11效果",
            cost() { return new Decimal(1e100) },
            unlocked() { return true },

        },
    },
    tabFormat: {
        "main": {
            content: [
                "main-display",
["prestige-button", "", function () { return hasMilestone("f", 1) ? { 'display': 'none' } : {} }],

                ["display-text", () => 
                    `9.滚雪球同样是具备张力的 复制点每秒x${format(layers.f.m())},建议在复制点略高于价格时购买`,
                    { "font-size": "20px" }
                ],
"milestones",
                "blank",
                "buyables",
                "blank",
                "upgrades"
            ],
            unlocked() { return true }
        },
     
        },
    
    update(diff) {
player.f.points = player.f.points.mul(this.m().pow(diff))
        player.f.points = player.f.points.min(1e101)//下版本移除
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
   
    layerShown() { return hasMilestone("a", 4) }
})