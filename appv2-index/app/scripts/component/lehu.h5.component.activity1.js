define('lehu.h5.component.activity1', [
        'zepto',
        'can',
        'lehu.h5.business.config',
        'lehu.util',
        'lehu.h5.api',
        'lehu.hybrid',
        'md5',

        'imgLazyLoad',
        'lehu.utils.busizutil',

        'text!template_components_activity1'
    ],

    function ($, can, LHConfig, util, LHAPI, LHHybrid, md5,
              imagelazyload, busizutil,
              template_components_activity1) {
        'use strict';

        return can.Control.extend({

            /**
             * @override
             * @description 初始化方法
             */
            init: function () {
                this.render();
            },

            render: function () {
                var params = can.deparam(window.location.search.substr(1));

                //根据params的type来判断渲染的页面
                this.request(params.type);
            },

            request: function (type) {
                var TYPES = [
                    //保健
                    {
                        activity: {
                            title: '保健抄底价  818血拼到底',
                            activityImg: 'images/activity1/activity1_01.jpg'
                        },
                        goods: [
                            {
                                goodsId: '6273',
                                goodsItemId: '6284',
                                goodsItemImg: 'images/activity1/activity1_02.jpg',
                                goodsName: 'Healthy Care 蜂胶胶囊2000mg 200粒',
                                goodsItemPrice: '¥119',
                                promotionPrice: '¥145'
                            },
                            {
                                goodsId: '6267',
                                goodsItemId: '6278',
                                goodsItemImg: 'images/activity1/activity1_03.jpg',
                                goodsName: 'Swisse 深海野生鱼油 400粒',
                                goodsItemPrice: '¥145',
                                promotionPrice: '¥175'
                            },
                            {
                                goodsId: '6641',
                                goodsItemId: '6652',
                                goodsItemImg: 'images/activity1/activity1_04.jpg',
                                goodsName: 'Swisse葡萄籽180粒*2瓶',
                                goodsItemPrice: '¥255',
                                promotionPrice: '¥278'
                            },
                            {
                                goodsId: '6271',
                                goodsItemId: '6282',
                                goodsItemImg: 'images/activity1/activity1_05.jpg',
                                goodsName: 'Life Space成人益生菌 60粒',
                                goodsItemPrice: '¥155',
                                promotionPrice: '¥179'
                            },
                            {
                                goodsId: '6476',
                                goodsItemId: '6487',
                                goodsItemImg: 'images/activity1/activity1_06.jpg',
                                goodsName: '２件装｜Swisse 蔓越莓25000毫克 30粒',
                                goodsItemPrice: '¥155',
                                promotionPrice: '¥168'
                            },
                            {
                                goodsId: '5937',
                                goodsItemId: '5948',
                                goodsItemImg: 'images/activity1/activity1_07.jpg',
                                goodsName: '男士爱乐维 Menevit 90粒',
                                goodsItemPrice: '¥419',
                                promotionPrice: '¥439'
                            },
                            {
                                goodsId: '6062',
                                goodsItemId: '6073',
                                goodsItemImg: 'images/activity1/activity1_08.jpg',
                                goodsName: '日本SANTEN-FX参天缓解疲劳保护角膜玫瑰眼药水滴眼液12ml/瓶',
                                goodsItemPrice: '¥99',
                                promotionPrice: '¥136'
                            },
                            {
                                goodsId: '6608',
                                goodsItemId: '6619',
                                goodsItemImg: 'images/activity1/activity1_09.jpg',
                                goodsName: '2件装 | Blackmores 维骨力关节灵1500mg  90粒',
                                goodsItemPrice: '¥299',
                                promotionPrice: '¥327'
                            },
                            {
                                goodsId: '5922',
                                goodsItemId: '5933',
                                goodsItemImg: 'images/activity1/activity1_10.jpg',
                                goodsName: '石榴酵素 100%发酵石榴 1.5g/包 40包/盒 1盒装',
                                goodsItemPrice: '¥168',
                                promotionPrice: '¥258'
                            },
                            {
                                goodsId: '5929',
                                goodsItemId: '5940',
                                goodsItemImg: 'images/activity1/activity1_11.jpg',
                                goodsName: 'Biocyte美白淡斑丸 40粒',
                                goodsItemPrice: '¥235',
                                promotionPrice: '¥248'
                            },
                            {
                                goodsId: '6678',
                                goodsItemId: '6689',
                                goodsItemImg: 'images/activity1/activity1_12.jpg',
                                goodsName: '2盒装|日本山本汉方 大麦若叶粉末100% 有机青汁3g*44袋/盒',
                                goodsItemPrice: '¥158',
                                promotionPrice: '¥188'
                            },
                            {
                                goodsId: '10959',
                                goodsItemId: '11051',
                                goodsItemImg: 'images/activity1/activity1_13.jpg',
                                goodsName: 'Metabolic 凹凹凹专S腰腹diet 30袋装',
                                goodsItemPrice: '¥180',
                                promotionPrice: '¥226'
                            },
                            {
                                goodsId: '6269',
                                goodsItemId: '6280',
                                goodsItemImg: 'images/activity1/activity1_14.jpg',
                                goodsName: 'Nu-lax 乐康膏 250g 2盒装',
                                goodsItemPrice: '¥95',
                                promotionPrice: '¥105'
                            },
                            {
                                goodsId: '11201',
                                goodsItemId: '11420',
                                goodsItemImg: 'images/activity1/activity1_15.jpg',
                                goodsName: 'RoyalValley皇家维乐碧蔓越莓黑糖500ml',
                                goodsItemPrice: '¥79',
                                promotionPrice: '¥89'
                            },
                            {
                                goodsId: '6648',
                                goodsItemId: '6659',
                                goodsItemImg: 'images/activity1/activity1_16.jpg',
                                goodsName: 'Swisse胶原蛋白片100 粒*2瓶',
                                goodsItemPrice: '¥199',
                                promotionPrice: '¥225'
                            },
                            {
                                goodsId: '5944',
                                goodsItemId: '5955',
                                goodsItemImg: 'images/activity1/activity1_17.jpg',
                                goodsName: 'Healthy Care 辅酶Q10 100粒 澳洲',
                                goodsItemPrice: '¥168',
                                promotionPrice: '¥199'
                            },
                        ]
                    },

                    //服饰鞋包
                    {
                        activity: {
                            title: '818不可错过的人气好货',
                            activityImg: 'images/activity1/activity2_01.jpg'
                        },
                        goods: [
                            {
                                goodsId: '11288',
                                goodsItemId: '11523',
                                goodsItemImg: 'images/activity1/activity2_02.jpg',
                                goodsName: '【香港直邮】施华洛世奇 十二星座项链女 狮子座 锁骨链',
                                goodsItemPrice: '¥599',
                                promotionPrice: '¥990'
                            },
                            {
                                goodsId: '11210',
                                goodsItemId: '11384',
                                goodsItemImg: 'images/activity1/activity2_03.jpg',
                                goodsName: 'DW手表新款32mm纯白夏日女表',
                                goodsItemPrice: '¥799',
                                promotionPrice: '¥1190'
                            },
                            {
                                goodsId: '11289',
                                goodsItemId: '11524',
                                goodsItemImg: 'images/activity1/activity2_04.jpg',
                                goodsName: '【香港直邮】施华洛世奇 十二星座项链女 处女座 锁骨链',
                                goodsItemPrice: '¥599',
                                promotionPrice: '¥990'
                            },
                            {
                                goodsId: '204',
                                goodsItemId: '215',
                                goodsItemImg: 'images/activity1/activity2_05.jpg',
                                goodsName: 'PANDORA潘多拉 甜心宝贝心形串珠',
                                goodsItemPrice: '¥599',
                                promotionPrice: '¥698'
                            },
                            {
                                goodsId: '11291',
                                goodsItemId: '11526',
                                goodsItemImg: 'images/activity1/activity2_06.jpg',
                                goodsName: '【香港直邮】施华洛世奇 十二星座项链女 天秤座 锁骨链',
                                goodsItemPrice: '¥599',
                                promotionPrice: '¥990'
                            },
                            {
                                goodsId: '6862',
                                goodsItemId: '6873',
                                goodsItemImg: 'images/activity1/activity2_07.jpg',
                                goodsName: '潘多拉 Moments 925纯银心形扣 蛇骨链手链 18cm',
                                goodsItemPrice: '¥499',
                                promotionPrice: '¥698'
                            },
                            {
                                goodsId: '6800',
                                goodsItemId: '6811',
                                goodsItemImg: 'images/activity1/activity2_08.jpg',
                                goodsName: '【香港直邮】施华洛世奇  情人节环心扉之钥水晶链坠',
                                goodsItemPrice: '¥669',
                                promotionPrice: '¥759'
                            },
                            {
                                goodsId: '7179',
                                goodsItemId: '7190',
                                goodsItemImg: 'images/activity1/activity2_09.jpg',
                                goodsName: '【韩国直邮】韩国lets diet 夏季防晒帽 防紫外线-蓝色',
                                goodsItemPrice: '63.9',
                                promotionPrice: '¥128'
                            },
                            {
                                goodsId: '6744',
                                goodsItemId: '6755',
                                goodsItemImg: 'images/activity1/activity2_10.jpg',
                                goodsName: '韩国ROV 防晒遮阳帽 户外遮光沙滩美肤挡光 荧光绿',
                                goodsItemPrice: '¥99.9',
                                promotionPrice: '¥138'
                            },
                            {
                                goodsId: '7199',
                                goodsItemId: '7210',
                                goodsItemImg: 'images/activity1/activity2_11.jpg',
                                goodsName: '【香港直邮】韩国let`s slim防晒冰袖（黑+白）各1副',
                                goodsItemPrice: '¥99.9',
                                promotionPrice: '¥129'
                            },
                            {
                                goodsId: '7153',
                                goodsItemId: '7164',
                                goodsItemImg: 'images/activity1/activity2_12.jpg',
                                goodsName: '【美国直邮】MK长款圣诞绿牛皮十字压纹 磁扣钱包',
                                goodsItemPrice: '¥799',
                                promotionPrice: '¥899'
                            },
                            {
                                goodsId: '7154',
                                goodsItemId: '7165',
                                goodsItemImg: 'images/activity1/activity2_13.jpg',
                                goodsName: '【美国直邮】MK圣诞绿真皮十字压纹卡包',
                                goodsItemPrice: '¥599',
                                promotionPrice: '¥699'
                            },
                            {
                                goodsId: '7145',
                                goodsItemId: '7156',
                                goodsItemImg: 'images/activity1/activity2_14.jpg',
                                goodsName: '【美国直邮】MK 小羊皮菱纹格单肩斜挎包 大号 枣红色',
                                goodsItemPrice: '¥1999',
                                promotionPrice: '¥2499'
                            },
                            {
                                goodsId: '7149',
                                goodsItemId: '7160',
                                goodsItemImg: 'images/activity1/activity2_15.jpg',
                                goodsName: '【美国直邮】MK荔枝纹皮拼接单肩手提包 中号 砖红色',
                                goodsItemPrice: '¥2499',
                                promotionPrice: '¥3480'
                            },
                            {
                                goodsId: '11293',
                                goodsItemId: '11528',
                                goodsItemImg: 'images/activity1/activity2_16.jpg',
                                goodsName: '【香港直邮】施华洛世奇 十二星座项链女 天蝎座 锁骨链',
                                goodsItemPrice: '¥599',
                                promotionPrice: '¥990'
                            },
                            {
                                goodsId: '11295',
                                goodsItemId: '11530',
                                goodsItemImg: 'images/activity1/activity2_17.jpg',
                                goodsName: '【香港直邮】施华洛世奇 十二星座项链女 射手座 锁骨链',
                                goodsItemPrice: '¥599',
                                promotionPrice: '¥990'
                            },
                            {
                                goodsId: '11296',
                                goodsItemId: '11531',
                                goodsItemImg: 'images/activity1/activity2_18.jpg',
                                goodsName: '【香港直邮】施华洛世奇 十二星座项链女 摩羯座 锁骨链',
                                goodsItemPrice: '¥599',
                                promotionPrice: '¥990'
                            },
                            {
                                goodsId: '11297',
                                goodsItemId: '11532',
                                goodsItemImg: 'images/activity1/activity2_19.jpg',
                                goodsName: '【香港直邮】施华洛世奇十二星座项链女 水瓶座 锁骨链',
                                goodsItemPrice: '¥599',
                                promotionPrice: '¥990'
                            },
                            {
                                goodsId: '6763',
                                goodsItemId: '6774',
                                goodsItemImg: 'images/activity1/activity2_20.jpg',
                                goodsName: '韩国 vvc防晒帽 蓝色',
                                goodsItemPrice: '¥168',
                                promotionPrice: '¥198'
                            },
                            {
                                goodsId: '6762',
                                goodsItemId: '6773',
                                goodsItemImg: 'images/activity1/activity2_21.jpg',
                                goodsName: '韩国 vvc防晒帽 绿色',
                                goodsItemPrice: '¥168',
                                promotionPrice: '¥198'
                            },
                            {
                                goodsId: '6761',
                                goodsItemId: '6772',
                                goodsItemImg: 'images/activity1/activity2_22.jpg',
                                goodsName: '韩国 vvc防晒帽 粉色',
                                goodsItemPrice: '¥168',
                                promotionPrice: '¥198'
                            },
                            {
                                goodsId: '6748',
                                goodsItemId: '6759',
                                goodsItemImg: 'images/activity1/activity2_23.jpg',
                                goodsName: '韩国 vvc防晒帽 红色',
                                goodsItemPrice: '¥168',
                                promotionPrice: '¥198'
                            }
                        ]
                    },

                    //家居
                    {
                        activity: {
                            title: '818家居数码 上新精选',
                            activityImg: 'images/activity1/activity3_01.jpg'
                        },
                        goods: [
                            {
                                goodsId: '11363',
                                goodsItemId: '11616',
                                goodsItemImg: 'images/activity1/activity3_02.jpg',
                                goodsName: '德国(EMSA)爱慕莎不锈钢进口捷程保温杯保冷杯运动杯弹开杯 460ml',
                                goodsItemPrice: '¥248'
                            },
                            {
                                goodsId: '2',
                                goodsItemId: '2',
                                goodsItemImg: 'images/activity1/activity3_03.jpg',
                                goodsName: '【保税区发货】大朴DAPU 16支精梳埃及长绒棉浴巾',
                                goodsItemPrice: '¥79'
                            },
                            {
                                goodsId: '11361',
                                goodsItemId: '11614',
                                goodsItemImg: 'images/activity1/activity3_04.jpg',
                                goodsName: '【荷兰直邮】凌美 LAMY 28F恒星系列钢笔 蓝（带上墨器）',
                                goodsItemPrice: '¥219'
                            },
                            {
                                goodsId: '4849',
                                goodsItemId: '4860',
                                goodsItemImg: 'images/activity1/activity3_05.jpg',
                                goodsName: '【保税区发货】2件装I德国碧然德碧然德滤芯 (3+1）4只装*2',
                                goodsItemPrice: '¥288'
                            },
                            {
                                goodsId: '4470',
                                goodsItemId: '4481',
                                goodsItemImg: 'images/activity1/activity3_06.jpg',
                                goodsName: '【保税区发货】日本rocket花香型洗衣粉 900g',
                                goodsItemPrice: '¥31'
                            },
                            {
                                goodsId: '3978',
                                goodsItemId: '3989',
                                goodsItemImg: 'images/activity1/activity3_07.jpg',
                                goodsName: '德国 Christian Ulbricht “持灯人” 挂饰系列',
                                goodsItemPrice: '¥119'
                            },
                            {
                                goodsId: '4845',
                                goodsItemId: '4856',
                                goodsItemImg: 'images/activity1/activity3_08.jpg',
                                goodsName: '德国碧然德净水器 尊享系列 3.5L 黑色 【一壶七芯】',
                                goodsItemPrice: '¥499'
                            },
                            {
                                goodsId: '4879',
                                goodsItemId: '4890',
                                goodsItemImg: 'images/activity1/activity3_09.jpg',
                                goodsName: '【香港C仓】德国BRAUN 博朗 离子发梳 BR750',
                                goodsItemPrice: '¥239'
                            },
                            {
                                goodsId: '5177',
                                goodsItemId: '5188',
                                goodsItemImg: 'images/activity1/activity3_10.jpg',
                                goodsName: '吉列 Gillette 锋隐致顺 刀架含1刀架1刀头',
                                goodsItemPrice: '¥96',
                            },
                            {
                                goodsId: '11085',
                                goodsItemId: '11216',
                                goodsItemImg: 'images/activity1/activity3_11.jpg',
                                goodsName: 'SanDisk闪迪 8G U盘 酷刃 迷你可爱8gu盘',
                                goodsItemPrice: '¥33'
                            },
                            {
                                goodsId: '10988',
                                goodsItemId: '11081',
                                goodsItemImg: 'images/activity1/activity3_12.jpg',
                                goodsName: '【3台装】手持小电风扇 充电 *3台（黑色、蓝色、白色各一台）随机发货',
                                goodsItemPrice: '¥99'
                            },
                            {
                                goodsId: '11301',
                                goodsItemId: '11536',
                                goodsItemImg: 'images/activity1/activity3_13.jpg',
                                goodsName: '飞利浦 Philips  成人充电式声波震动电动牙刷 刷头 四只装刷头 HX6064/33 钻石美白型',
                                goodsItemPrice: '¥249'
                            },
                            {
                                goodsId: '11323',
                                goodsItemId: '11569',
                                goodsItemImg: 'images/activity1/activity3_14.jpg',
                                goodsName: '飞利浦 Philips 男士电动剃须刀刮胡刀 HQ6996/16',
                                goodsItemPrice: '¥369'
                            },
                            {
                                goodsId: '11299',
                                goodsItemId: '11534',
                                goodsItemImg: 'images/activity1/activity3_15.jpg',
                                goodsName: 'Braun 博朗 电动剃须刀网罩配件 刀头+网膜组合 30B',
                                goodsItemPrice: '¥208'
                            },
                            {
                                goodsId: '11353',
                                goodsItemId: '11604',
                                goodsItemImg: 'images/activity1/activity3_16.jpg',
                                goodsName: '3件装 | 大公鸡管家天然植物洗衣液1L',
                                goodsItemPrice: '¥88'
                            },
                            {
                                goodsId: '11345',
                                goodsItemId: '11592',
                                goodsItemImg: 'images/activity1/activity3_17.jpg',
                                goodsName: '3瓶装 | 大公鸡管家洗洁精（马赛）500ML',
                                goodsItemPrice: '¥89'
                            },
                            {
                                goodsId: '11368',
                                goodsItemId: '11627',
                                goodsItemImg: 'images/activity1/activity3_18.jpg',
                                goodsName: '德国(EMSA)爱慕莎万乐系列儿童餐盒6件套 自由搭配 多色',
                                goodsItemPrice: '¥69'
                            },
                            {
                                goodsId: '11367',
                                goodsItemId: '11624',
                                goodsItemImg: 'images/activity1/activity3_19.jpg',
                                goodsName: '德国(EMSA)爱慕莎不锈钢保温杯保冷杯女士杯弹开杯 360毫升',
                                goodsItemPrice: '¥228'
                            },
                            {
                                goodsId: '11318',
                                goodsItemId: '11563',
                                goodsItemImg: 'images/activity1/activity3_20.jpg',
                                goodsName: '飞利浦 PHILIPS 电动剃须刀 三刀头水洗 S5100/06',
                                goodsItemPrice: '¥588'
                            },
                            {
                                goodsId: '11302',
                                goodsItemId: '11537',
                                goodsItemImg: 'images/activity1/activity3_21.jpg',
                                goodsName: '飞利浦 Philips  电动剃须刀S7720/26 智能清洁舒适顺滑剃须刀',
                                goodsItemPrice: '¥1390'
                            }
                        ]
                    },

                    //美食
                    {
                        activity: {
                            title: '玩“味“一夏  嗨翻酷暑',
                            activityImg: 'images/activity1/activity4_01.jpg'
                        },
                        goods: [
                            {
                                goodsId: '11351',
                                goodsItemId: '11602',
                                goodsItemImg: 'images/activity1/activity4_02.jpg',
                                goodsName: '广西新鲜百香果大果（约35个）,5斤包邮',
                                goodsItemPrice: '¥29.9',
                                promotionPrice: '¥35.9'
                            },
                            {
                                goodsId: '11350',
                                goodsItemId: '11597',
                                goodsItemImg: 'images/activity1/activity4_03.jpg',
                                goodsName: '云南蒙自金丝蜜枣，5斤包邮。天然维生素',
                                goodsItemPrice: '¥85',
                                promotionPrice: '¥98'
                            },
                            {
                                goodsId: '11348',
                                goodsItemId: '11595',
                                goodsItemImg: 'images/activity1/activity4_04.jpg',
                                goodsName: '海南青皮红心牛奶木瓜，8斤包邮',
                                goodsItemPrice: '¥29.9',
                                promotionPrice: '¥35'
                            },
                            {
                                goodsId: '11347',
                                goodsItemId: '11594',
                                goodsItemImg: 'images/activity1/activity4_05.jpg',
                                goodsName: '攀枝花巨无霸凯特芒果一级果  5斤包邮',
                                goodsItemPrice: '¥35',
                                promotionPrice: '¥39'
                            },
                            {
                                goodsId: '11342',
                                goodsItemId: '11589',
                                goodsItemImg: 'images/activity1/activity4_06.jpg',
                                goodsName: '云南蒙自青皮石榴，3斤包邮',
                                goodsItemPrice: '¥24',
                                promotionPrice: '¥29'
                            },
                            {
                                goodsId: '11261',
                                goodsItemId: '11481',
                                goodsItemImg: 'images/activity1/activity4_07.jpg',
                                goodsName: '广西小台农芒果，5斤装包邮，现摘现发',
                                goodsItemPrice: '¥25',
                                promotionPrice: '¥29'
                            },
                            {
                                goodsId: '11260',
                                goodsItemId: '11480',
                                goodsItemImg: 'images/activity1/activity4_08.jpg',
                                goodsName: '陕西黑布林  果农现摘现发  5斤包邮（约22个）',
                                goodsItemPrice: '¥25',
                                promotionPrice: '¥29'
                            },
                            {
                                goodsId: '11259',
                                goodsItemId: '11479',
                                goodsItemImg: 'images/activity1/activity4_09.jpg',
                                goodsName: '山西 新鲜水蜜桃 红不软桃 5斤现摘包邮',
                                goodsItemPrice: '¥25',
                                promotionPrice: '¥29'
                            },
                            {
                                goodsId: '11258',
                                goodsItemId: '11478',
                                goodsItemImg: 'images/activity1/activity4_10.jpg',
                                goodsName: '泰国进口4A级精选优质新鲜山竹， 5斤装（25-30个）',
                                goodsItemPrice: '¥75',
                                promotionPrice: '¥88'
                            },
                            {
                                goodsId: '11206',
                                goodsItemId: '11379',
                                goodsItemImg: 'images/activity1/activity4_11.jpg',
                                goodsName: '砀山皇冠梨，2017年新果现摘现发。10斤/箱，江浙沪皖49包邮',
                                goodsItemPrice: '¥35',
                                promotionPrice: '¥39'
                            },
                            {
                                goodsId: '120',
                                goodsItemId: '131',
                                goodsItemImg: 'images/activity1/activity4_12.jpg',
                                goodsName: '北田168五谷杂粮（蛋黄）180g',
                                goodsItemPrice: '¥10.9',
                                promotionPrice: '¥11.9'
                            },
                            {
                                goodsId: '9086',
                                goodsItemId: '9097',
                                goodsItemImg: 'images/activity1/activity4_13.jpg',
                                goodsName: '尚图红葡萄酒',
                                goodsItemPrice: '¥95',
                                promotionPrice: '¥99'
                            },
                            {
                                goodsId: '9498',
                                goodsItemId: '9509',
                                goodsItemImg: 'images/activity1/activity4_14.jpg',
                                goodsName: '温莎12年威士忌',
                                goodsItemPrice: '¥149',
                                promotionPrice: '¥158'
                            },
                            {
                                goodsId: '9353',
                                goodsItemId: '9364',
                                goodsItemImg: 'images/activity1/activity4_15.jpg',
                                goodsName: '丰灵TIPO面包干300g（榴莲口味）',
                                goodsItemPrice: '¥18.9',
                                promotionPrice: '¥19.9'
                            },
                            {
                                goodsId: '9455',
                                goodsItemId: '9466',
                                goodsItemImg: 'images/activity1/activity4_16.jpg',
                                goodsName: '萱萱手撕牛肉片（XO酱味）180g',
                                goodsItemPrice: '¥26.9',
                                promotionPrice: '¥28.8'
                            },
                            {
                                goodsId: '9765',
                                goodsItemId: '9776',
                                goodsItemImg: 'images/activity1/activity4_17.jpg',
                                goodsName: '丽芝士纳宝帝奶酪威化饼干290g',
                                goodsItemPrice: '¥9.6',
                                promotionPrice: '¥9.9'
                            },
                            {
                                goodsId: '9814',
                                goodsItemId: '9825',
                                goodsItemImg: 'images/activity1/activity4_18.jpg',
                                goodsName: '小老板经典紫菜鱿鱼味（盒装）36g',
                                goodsItemPrice: '¥12.9',
                                promotionPrice: '¥13.8'
                            },
                            {
                                goodsId: '10016',
                                goodsItemId: '10027',
                                goodsItemImg: 'images/activity1/activity4_19.jpg',
                                goodsName: '乐事多蓝莓干100g',
                                goodsItemPrice: '¥22.9',
                                promotionPrice: '¥25.8'
                            },
                            {
                                goodsId: '10294',
                                goodsItemId: '10305',
                                goodsItemImg: 'images/activity1/activity4_20.jpg',
                                goodsName: '巧贝特巧克力味裹衣夹心饼干椰香味180g盒装',
                                goodsItemPrice: '¥8.9',
                                promotionPrice: '¥9.5'
                            },
                            {
                                goodsId: '10611',
                                goodsItemId: '10622',
                                goodsItemImg: 'images/activity1/activity4_21.jpg',
                                goodsName: '越南榙榙综合蔬果干200g',
                                goodsItemPrice: '¥16.9',
                                promotionPrice: '¥17.9'
                            }
                        ]
                    },

                    //美妆
                    {
                        activity: {
                            title: 'Summer 清凉妆品必备清单',
                            activityImg: 'images/activity1/activity5_01.jpg'
                        },
                        goods: [
                            {
                                goodsId: '1182',
                                goodsItemId: '1193',
                                goodsItemImg: 'images/activity1/activity5_02.jpg',
                                goodsName: '2瓶装丨韩国RECIPE/莱斯璧新概念透明水晶防晒喷雾150ml',
                                goodsItemPrice: '¥89',
                                promotionPrice: '¥119'
                            },
                            {
                                goodsId: '2753',
                                goodsItemId: '2764',
                                goodsItemImg: 'images/activity1/activity5_03.jpg',
                                goodsName: '3盒装丨美迪惠尔深层补水毛孔修复水库面膜10片/盒',
                                goodsItemPrice: '¥189',
                                promotionPrice: '¥219'
                            },
                            {
                                goodsId: '370',
                                goodsItemId: '381',
                                goodsItemImg: 'images/activity1/activity5_04.jpg',
                                goodsName: '2盒装丨Balea芭乐雅玻尿酸安瓶7支蓝色',
                                goodsItemPrice: '¥109',
                                promotionPrice: '¥128'
                            },
                            {
                                goodsId: '3069',
                                goodsItemId: '3080',
                                goodsItemImg: 'images/activity1/activity5_05.jpg',
                                goodsName: '森田玻尿酸复合原液面膜（10片）',
                                goodsItemPrice: '¥69',
                                promotionPrice: '¥77'
                            },
                            {
                                goodsId: '11232',
                                goodsItemId: '11409',
                                goodsItemImg: 'images/activity1/activity5_06.jpg',
                                goodsName: '水晶防晒喷雾150ml+塑身防晒喷雾 150ml',
                                goodsItemPrice: '¥79',
                                promotionPrice: '¥129'
                            },
                            {
                                goodsId: '1711',
                                goodsItemId: '1722',
                                goodsItemImg: 'images/activity1/activity5_07.jpg',
                                goodsName: '两瓶装|芭乐雅AQUA大喷爽肤水150ml',
                                goodsItemPrice: '¥79',
                                promotionPrice: '¥99'
                            },
                            {
                                goodsId: '1929',
                                goodsItemId: '1940',
                                goodsItemImg: 'images/activity1/activity5_08.jpg',
                                goodsName: '春雨蜂蜜面膜10片',
                                goodsItemPrice: '¥99',
                                promotionPrice: '¥108'
                            },
                            {
                                goodsId: '314',
                                goodsItemId: '325',
                                goodsItemImg: 'images/activity1/activity5_09.jpg',
                                goodsName: '2盒装丨[AHC]B5玻尿酸精华面膜',
                                goodsItemPrice: '¥189',
                                promotionPrice: '¥229'
                            },
                            {
                                goodsId: '2731',
                                goodsItemId: '2742',
                                goodsItemImg: 'images/activity1/activity5_10.jpg',
                                goodsName: '美迪惠尔水润保湿面膜10片/盒',
                                goodsItemPrice: '¥69',
                                promotionPrice: '¥79'
                            },
                            {
                                goodsId: '2582',
                                goodsItemId: '2593',
                                goodsItemImg: 'images/activity1/activity5_11.jpg',
                                goodsName: '宋慧乔同款-兰芝气垫BB霜（13号）+替换装15g',
                                goodsItemPrice: '¥199',
                                promotionPrice: '¥232'
                            },
                            {
                                goodsId: '2491',
                                goodsItemId: '2502',
                                goodsItemImg: 'images/activity1/activity5_12.jpg',
                                goodsName: '组合装丨MEDIHEAL(可莱丝）深层补水水库面膜10片+jayjun保加利亚红玫瑰面膜10片',
                                goodsItemPrice: '¥159',
                                promotionPrice: '¥169'
                            },
                            {
                                goodsId: '2584',
                                goodsItemId: '2595',
                                goodsItemImg: 'images/activity1/activity5_13.jpg',
                                goodsName: '【韩国直邮】LANEIGE/兰芝保湿泡沫洁颜膏',
                                goodsItemPrice: '¥109',
                                promotionPrice: '¥119'
                            },
                            {
                                goodsId: '1693',
                                goodsItemId: '1704',
                                goodsItemImg: 'images/activity1/activity5_14.jpg',
                                goodsName: 'blackmoresVitaminECream面霜50g',
                                goodsItemPrice: '¥52.9',
                                promotionPrice: '¥65'
                            },
                            {
                                goodsId: '3221',
                                goodsItemId: '3232',
                                goodsItemImg: 'images/activity1/activity5_15.jpg',
                                goodsName: '水光面膜三部曲植物干细胞面膜贴10片+美白补水保湿面膜贴10片',
                                goodsItemPrice: '¥189',
                                promotionPrice: '¥220'
                            },
                            {
                                goodsId: '2630',
                                goodsItemId: '2641',
                                goodsItemImg: 'images/activity1/activity5_16.jpg',
                                goodsName: '韩国丽得姿三代氨基酸补水保湿面膜',
                                goodsItemPrice: '¥69',
                                promotionPrice: '¥72'
                            },
                            {
                                goodsId: '1183',
                                goodsItemId: '1194',
                                goodsItemImg: 'images/activity1/activity5_17.jpg',
                                goodsName: '韩国RECIPE/莱斯璧新概念透明水晶防晒喷雾150ml',
                                goodsItemPrice: '¥59',
                                promotionPrice: '¥65'
                            },
                            {
                                goodsId: '3224',
                                goodsItemId: '3235',
                                goodsItemImg: 'images/activity1/activity5_18.jpg',
                                goodsName: '2盒装|[JAYJUN]水光维他命药丸能量面膜10片',
                                goodsItemPrice: '¥189',
                                promotionPrice: '¥205'
                            },
                            {
                                goodsId: '311',
                                goodsItemId: '322',
                                goodsItemImg: 'images/activity1/activity5_19.jpg',
                                goodsName: 'AHC高浓度B5高效水合透明质酸面膜贴（30g*5片)',
                                goodsItemPrice: '¥109',
                                promotionPrice: '¥121'
                            },
                            {
                                goodsId: '1721',
                                goodsItemId: '1732',
                                goodsItemImg: 'images/activity1/activity5_20.jpg',
                                goodsName: '芭妮兰卸妆膏',
                                goodsItemPrice: '¥99',
                                promotionPrice: '¥110'
                            },
                            {
                                goodsId: '1334',
                                goodsItemId: '1345',
                                goodsItemImg: 'images/activity1/activity5_21.jpg',
                                goodsName: '澳洲Swisse萃取小黄瓜卸妆液300ML',
                                goodsItemPrice: '¥59',
                                promotionPrice: '¥68'
                            },{
                                goodsId: '2336',
                                goodsItemId: '2347',
                                goodsItemImg: 'images/activity1/activity5_22.jpg',
                                goodsName: '惠润洗发露（绿野芳香）600ml',
                                goodsItemPrice: '¥49',
                                promotionPrice: '¥58'
                            },
                            {
                                goodsId: '912',
                                goodsItemId: '923',
                                goodsItemImg: 'images/activity1/activity5_23.jpg',
                                goodsName: '科颜氏牛油果眼霜28g',
                                goodsItemPrice: '¥329',
                                promotionPrice: '¥379'
                            },
                            {
                                goodsId: '2006',
                                goodsItemId: '2017',
                                goodsItemImg: 'images/activity1/activity5_24.jpg',
                                goodsName: '韩国Dr.Jart+/蒂佳婷V7维他命控油美白素颜霜',
                                goodsItemPrice: '¥216',
                                promotionPrice: '¥266'
                            },
                            {
                                goodsId: '2555',
                                goodsItemId: '2566',
                                goodsItemImg: 'images/activity1/activity5_25.jpg',
                                goodsName: 'Lancome兰蔻 新精华肌底液(小黑瓶） 50ml*2',
                                goodsItemPrice: '¥1199',
                                promotionPrice: '¥1399'
                            },
                            {
                                goodsId: '2231',
                                goodsItemId: '2242',
                                goodsItemImg: 'images/activity1/activity5_26.jpg',
                                goodsName: '[后]拱辰享美黄金气垫BB15g*2SPF50+/PA+++21号',
                                goodsItemPrice: '¥299',
                                promotionPrice: '¥349'
                            },
                            {
                                goodsId: '3721',
                                goodsItemId: '3732',
                                goodsItemImg: 'images/activity1/activity5_27.jpg',
                                goodsName: 'Jurlique茱莉蔻玫瑰丝柔爽肤粉10g',
                                goodsItemPrice: '¥259',
                                promotionPrice: '¥289'
                            },
                            {
                                goodsId: '914',
                                goodsItemId: '925',
                                goodsItemImg: 'images/activity1/activity5_28.jpg',
                                goodsName: '美国kiehl`s科颜氏亚马逊白泥净致面膜125ml',
                                goodsItemPrice: '¥229',
                                promotionPrice: '¥259'
                            },
                            {
                                goodsId: '2641',
                                goodsItemId: '2652',
                                goodsItemImg: 'images/activity1/activity5_29.jpg',
                                goodsName: 'LucasPapaw番木瓜膏75g',
                                goodsItemPrice: '¥66.9',
                                promotionPrice: '¥76'
                            }
                        ]
                    },

                    //母婴
                    {
                        activity: {
                            title: '818新货来袭  新品抢购',
                            activityImg: 'images/activity1/activity6_01.jpg'
                        },
                        goods: [
                            {
                                goodsId: '11262',
                                goodsItemId: '11482',
                                goodsItemImg: 'images/activity1/activity6_02.jpg',
                                goodsName: '澳洲版雅培小安素金装儿童长高1-10岁成长进口奶粉',
                                goodsItemPrice: '¥709',
                                promotionPrice: '¥739'
                            },
                            {
                                goodsId: '7311',
                                goodsItemId: '7322',
                                goodsItemImg: 'images/activity1/activity6_03.jpg',
                                goodsName: '诺优能Nutrilon 儿童配方奶粉4段800g',
                                goodsItemPrice: '¥158',
                                promotionPrice: '¥160'
                            },
                            {
                                goodsId: '66',
                                goodsItemId: '75',
                                goodsItemImg: 'images/activity1/activity6_04.jpg',
                                goodsName: '【香港直邮】A2三段婴儿奶粉900G',
                                goodsItemPrice: '¥738'
                            },
                            {
                                goodsId: '7907',
                                goodsItemId: '7918',
                                goodsItemImg: 'images/activity1/activity6_05.jpg',
                                goodsName: '英国版佳贝艾特Kabrita金装婴儿配方羊奶粉3段 2罐装',
                                goodsItemPrice: '¥479',
                                promotionPrice: '¥499'
                            },
                            {
                                goodsId: '7981',
                                goodsItemId: '7992',
                                goodsItemImg: 'images/activity1/activity6_06.jpg',
                                goodsName: 'Bellamy贝拉米3段婴儿奶粉*3罐装',
                                goodsItemPrice: '¥499',
                                promotionPrice: '¥528'
                            },
                            {
                                goodsId: '7899',
                                goodsItemId: '7910',
                                goodsItemImg: 'images/activity1/activity6_07.jpg',
                                goodsName: '【美国直邮】麦肯齐 4套装 感温勺子不锈钢',
                                goodsItemPrice: '¥69',
                                promotionPrice: '¥79.9'
                            },
                            {
                                goodsId: '8345',
                                goodsItemId: '8356',
                                goodsItemImg: 'images/activity1/activity6_08.jpg',
                                goodsName: '美国Nuby儿童便携吸盘碗防摔婴儿碗宝宝餐具套装（三件套）',
                                goodsItemPrice: '¥70'
                            },
                            {
                                goodsId: '11176',
                                goodsItemId: '11322',
                                goodsItemImg: 'images/activity1/activity6_09.jpg',
                                goodsName: '可么多么comotomo奶瓶绿色250ml独立',
                                goodsItemPrice: '¥149'
                            },
                            {
                                goodsId: '7990',
                                goodsItemId: '8001',
                                goodsItemImg: 'images/activity1/activity6_10.jpg',
                                goodsName: '【香港直邮】NUK/玻璃奶瓶/240ml浅蓝色',
                                goodsItemPrice: '¥78',
                                promotionPrice: '¥85'
                            },
                            {
                                goodsId: '11185',
                                goodsItemId: '11331',
                                goodsItemImg: 'images/activity1/activity6_11.jpg',
                                goodsName: '童年时光ChildLife 紫雏菊滴剂29.6ml',
                                goodsItemPrice: '¥89'
                            },
                            {
                                goodsId: '11430',
                                goodsItemId: '11689',
                                goodsItemImg: 'images/activity1/activity6_12.jpg',
                                goodsName: 'Bio Island 婴幼儿海藻油DHA 60粒',
                                goodsItemPrice: '¥95',
                                promotionPrice: '¥115'
                            },
                            {
                                goodsId: '8261',
                                goodsItemId: '8272',
                                goodsItemImg: 'images/activity1/activity6_13.jpg',
                                goodsName: '【香港直邮】2件|喜宝五种谷物米粉（6个月以上）250g',
                                goodsItemPrice: '¥79',
                                promotionPrice: '¥99'
                            },
                            {
                                goodsId: '11352',
                                goodsItemId: '11603',
                                goodsItemImg: 'images/activity1/activity6_14.jpg',
                                goodsName: 'Munchkin满趣健 新西兰婴幼儿奶粉一段 6罐装',
                                goodsItemPrice: '¥818',
                                promotionPrice: '¥835'
                            },
                            {
                                goodsId: '11354',
                                goodsItemId: '11605',
                                goodsItemImg: 'images/activity1/activity6_15.jpg',
                                goodsName: 'Munchkin满趣健 新西兰婴幼儿奶粉二段 6罐装',
                                goodsItemPrice: '¥818',
                                promotionPrice: '¥835'
                            },
                            {
                                goodsId: '11107',
                                goodsItemId: '11238',
                                goodsItemImg: 'images/activity1/activity6_16.jpg',
                                goodsName: '【5号仓】韩国Melonbaby柚子宝宝有机儿童霜 150ml',
                                goodsItemPrice: '¥35'
                            },
                            {
                                goodsId: '11112',
                                goodsItemId: '11243',
                                goodsItemImg: 'images/activity1/activity6_17.jpg',
                                goodsName: 'melonbaby柚子宝宝 婴儿洗衣液儿童新生儿洗衣液1300ML',
                                goodsItemPrice: '¥55',
                                promotionPrice: '¥59'
                            },
                            {
                                goodsId: '11303',
                                goodsItemId: '11543',
                                goodsItemImg: 'images/activity1/activity6_18.jpg',
                                goodsName: 'Boon球形婴幼儿零食盒 170g',
                                goodsItemPrice: '¥49',
                                promotionPrice: '¥58'
                            },
                            {
                                goodsId: '7507',
                                goodsItemId: '11539',
                                goodsItemImg: 'images/activity1/activity6_19.jpg',
                                goodsName: '【香港直邮】小蜜蜂紫草膏_15g*2 两只装',
                                goodsItemPrice: '¥79',
                                promotionPrice: '¥85'
                            },
                            {
                                goodsId: '8008',
                                goodsItemId: '8019',
                                goodsItemImg: 'images/activity1/activity6_20.jpg',
                                goodsName: '【香港直邮】地球妈妈退奶茶_16包装',
                                goodsItemPrice: '¥45',
                                promotionPrice: '¥49'
                            },
                            {
                                goodsId: '11340',
                                goodsItemId: '11587',
                                goodsItemImg: 'images/activity1/activity6_21.jpg',
                                goodsName: '【香港直邮】帕玛氏产后紧致消妊辰纹按摩霜_饼状_125g+胸部按摩膏',
                                goodsItemPrice: '¥119',
                                promotionPrice: '¥135'
                            }
                        ]
                    }
                ];

                //render 页面
                this.paint(TYPES[type]);
            },

            paint: function (data) {

                var params = can.deparam(window.location.search.substr(1));
                var that = this;
                var ACTIVITYLIST = data;

                var TITLE = ACTIVITYLIST.activity.title;

                $('title').html(TITLE);

                this.options.data = new can.Map(ACTIVITYLIST);

                var renderFn = can.mustache(template_components_activity1);
                var html = renderFn(that.options.data);
                this.element.html(html);

                //    去导航条
                this.deleteNav();
                //图片懒加载
                $.imgLazyLoad();

                //标题
                if (params.hyfrom == 'app') {
                    if (util.isMobile.Android() || util.isMobile.iOS()) {
                        var jsonParams = {
                            'funName': 'title_fun',
                            'params': {
                                "title": TITLE
                            }
                        };
                        LHHybrid.nativeFun(jsonParams);
                    }
                }
            },

            //去商品详情
            ".list-content-square a click": function (element, event) {
                var goodsid = element.attr("data-goodsid");
                var goodsitemid = element.attr("data-goodsitemid");
                this.toDetail(goodsid, goodsitemid);
            },

            deleteNav: function () {
                var param = can.deparam(window.location.search.substr(1));
                if (param.hyfrom) {
                    $('.header').hide();
                    return false;
                }
            },

            toDetail: function (goodsid, goodsitemid) {
                var jsonParams = {
                    'funName': 'goods_detail_fun',
                    'params': {
                        'goodsId': goodsid,
                        'goodsItemId': goodsitemid
                    }
                };
                LHHybrid.nativeFun(jsonParams);
            },

            '.back click': function () {
                history.go(-1);
            }
        });

    });