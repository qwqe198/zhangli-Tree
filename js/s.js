addLayer("s", {
    name: "复制超新星", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "s", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
st: new Decimal(0),
        }
    },
    color: "#ffe600ff",
    requires: new Decimal(1e154), // Can be a function that takes requirement increases into account
    resource: "复制超新星", // Name of prestige currency
    baseResource: "复制点", // Name of resource prestige is based on
    baseAmount() { return player.f.points }, // Get the current amount of baseResource
    type: "static", // normal:膨胀资源层 static: 非膨胀资源层 使用时要加双引号
    exponent: 0.01, // Prestige currency exponent 初始值0.5
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)

        return mult
    },
stg() { // Calculate the multiplier for main currency from bonuses
        st = new Decimal(1)
if(hasUpgrade("s",15))st=st.mul(upgradeEffect("s",15))
        return st
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
exp = new Decimal(1)


        return exp
    },
   getNextAt() {
        let gain = new Decimal("1e154").pow(new Decimal(2).pow(player.s.points))
      
        return gain
    },
upgrades: {
        11: {
            description: "m1使中子星加成点数获取速度",
            cost() { return new Decimal(100) },
            unlocked() { return true },
effect(){
                    let b=player.s.st
            if(hasMilestone("a",15))b=b.mul(player.s.points.pow(player.a.points))
b=b.pow(4)
                    return b;
                },
effectDisplay() { return format(this.effect())+"倍" },
currencyDisplayName: "中子星",
        currencyInternalName: "st",
        currencyLayer: "s"
        },
      12: {
            description: "rp1使中子星加成张力点获取速度",
            cost() { return new Decimal(200) },
            unlocked() { return true },
effect(){
                    let b=player.s.st
if(hasMilestone("a",15))b=b.mul(player.s.points.pow(player.a.points))
                 b=b.pow(2)
                    return b;
                },
effectDisplay() { return format(this.effect())+"倍" },
currencyDisplayName: "中子星",
        currencyInternalName: "st",
        currencyLayer: "s"
        }, 
 13: {
            description: "bh1使中子星加成冲击碎片获取速度",
            cost() { return new Decimal(400) },
            unlocked() { return true },
effect(){
                    let b=player.s.st
                 if(hasMilestone("a",15))b=b.mul(player.s.points.pow(player.a.points))
                    return b;
                },
effectDisplay() { return format(this.effect())+"倍" },
currencyDisplayName: "中子星",
        currencyInternalName: "st",
        currencyLayer: "s"
        }, 
 14: {
            description: "s1使中子星加成复制乘数",
            cost() { return new Decimal(400) },
            unlocked() { return true },
effect(){
                    let b=player.s.st.add(1).log10().mul(0.0025).add(1)
                 
                    return b;
                },
effectDisplay() { return format(this.effect())+"倍" },
currencyDisplayName: "中子星",
        currencyInternalName: "st",
        currencyLayer: "s"
        }, 
15: {
            description: "sn2使超新星次数可以加成中子星获取速度",
            cost() { return new Decimal(350) },
            unlocked() { return player.s.points.gte(2) },
effect(){
                    let b=player.s.points.pow(2)
                 
                    return b;
                },
effectDisplay() { return format(this.effect())+"倍" },
currencyDisplayName: "中子星",
        currencyInternalName: "st",
        currencyLayer: "s"
        }, 
21: {
            description: "t1使复制乘数变成原来的1.15次方",
            cost() { return new Decimal(1500) },
            unlocked() { return player.s.points.gte(2) },

currencyDisplayName: "中子星",
        currencyInternalName: "st",
        currencyLayer: "s"
        }, 
22: {
            description: "bh2使张力点变成原来的1.15次方",
            cost() { return new Decimal(1500) },
            unlocked() { return player.s.points.gte(2) },

currencyDisplayName: "中子星",
        currencyInternalName: "st",
        currencyLayer: "s"
        }, 
23: {
            description: "qol1自动购买p购买12",
            cost() { return new Decimal(1500) },
            unlocked() { return player.s.points.gte(2) },

currencyDisplayName: "中子星",
        currencyInternalName: "st",
        currencyLayer: "s"
        }, 
24: {
            description: "m2 23 看似减益 实则增益 一定张力 使里程碑14的效果/1.1",
            cost() { return new Decimal(10000) },
            unlocked() { return player.s.points.gte(3) },

currencyDisplayName: "中子星",
        currencyInternalName: "st",
        currencyLayer: "s"
        }, 
25: {
            description: "qol2你的复制点不会低于1",
            cost() { return new Decimal(10000) },
            unlocked() { return player.s.points.gte(3) },

currencyDisplayName: "中子星",
        currencyInternalName: "st",
        currencyLayer: "s"
        }, 
    },

    tabFormat: {
        "upg": {
            content: [
                "main-display",
 "prestige-button",
                "resource-display",
                ["display-text", () => 
                    `你有${format(player.s.st)}(+${format(layers.s.stg())}/s)中子星`,
                    { "font-size": "20px" }
                ],
"upgrades",
                
            ],
            unlocked() { return true }
        },
     "buy": {
            content: [
                "main-display",
 "prestige-button",
                "resource-display",
                ["display-text", () => 
                    `你有${format(player.s.st)}(+${format(layers.s.stg())}/s)中子星`,
                    { "font-size": "20px" }
                ],

                "buyables",
            ],
            unlocked() { return true }
        },
        },
    
    update(diff) {
        player.s.st = player.s.st.add(this.stg().mul(diff))
        
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        { key: "s", description: "s: 进行超新星重置", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
    layerShown() { return hasMilestone("a",1) }
})