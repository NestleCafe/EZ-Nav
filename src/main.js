const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')

const x = localStorage.getItem('x') //本地存储增加的站点

const xObject = JSON.parse(x)
const hashMap = xObject || [
    {logo:"G", logoType:'text',url:"https://github.com/"},
    {logo:"G", logoType:"text", url:"https://www.google.com/"},
    {logo:"B", logoType:"text", url:"https://www.bilibili.com/"},
    {logo:"Z", logoType:"text", url:"https://www.zhihu.com/"},
]

getDateStr = (DayCount) =>{ 
    var d = new Date();
    d.setDate(d.getDate()+DayCount);//获取AddDayCount天后的日期
    var y = d.getFullYear(); 
    var m = (d.getMonth()+1)<10 ? "0"+(d.getMonth()+1) : (d.getMonth()+1);//获取当前月份的日期，不足10补0
    var d = d.getDate()<10 ? "0"+d.getDate() : d.getDate();//获取当前几号，不足10补0
    return y+m+d; 
}
let dateList =[]
for(let i=0,j=0;i<6;i++,j--){
    dateList[i] = getDateStr(j)
}
const bodyBackground = [
    ` url('https://tupian.sioe.cn/b/bing-home-image/pic/${dateList[0]}.jpg')`,
    ` url('https://tupian.sioe.cn/b/bing-home-image/pic/${dateList[1]}.jpg')`,
    ` url('https://tupian.sioe.cn/b/bing-home-image/pic/${dateList[2]}.jpg')`,
    ` url('https://tupian.sioe.cn/b/bing-home-image/pic/${dateList[3]}.jpg')`,
    ` url('https://tupian.sioe.cn/b/bing-home-image/pic/${dateList[4]}.jpg')`,
    ` url('https://tupian.sioe.cn/b/bing-home-image/pic/${dateList[5]}.jpg')`,
]

const removePrefix = (url) =>{
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '') //用正则表达式 删除 / 开头的内容
}

const render = () =>{
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index)=>{
        const $li = $(`
        <li>
            
            <div class="site">
                <div class="logo">${removePrefix(node.url)[0].toUpperCase()}</div>
                <div class="link">${removePrefix(node.url)}</div>
                <div class="close">
                    <svg class="icon">
                        <use xlink:href="#icon-quxiao"></use>
                    </svg>
                </div>
            </div>
        
        </li>`
        ).insertBefore($lastLi)
        $li.on('click', ()=>{
            window.open(node.url)
        })
        $li.on('click', '.close', (e)=>{
            e.stopPropagation() //阻止冒泡
            hashMap.splice(index, 1)
            render()
        })
    })
}

render()
$('.addButton')
    .on('click',()=>{
        let url = window.prompt("请输入添加的网址")
        if(url.indexOf('http') !== 0){
            url = 'https://' + url
        }
        console.log(url)
        hashMap.push({
            logoType: "text",
            url: url
        })
        render()
    })
$('.close')
.on('click',()=>{
    console.log('close被点击')
    
})

/* 
$(document).on('keypress', (e)=>{
    const {key} = e
    for(let i=0; i<hashMap.length; i++){
        if(hashMap[i].logo.toLowerCase() === key){
            window.open(hashMap[i].url)
        }
    }
}) */ //暂时禁用了键盘导航

$('#baidu').on('click', ()=>{
    if($('#baidu').attr('class') === 'inactive'){
        $('#baidu').attr('class','active')
        $('#google').attr('class','inactive')
        
        $('.searchForm').attr('action','https://www.baidu.com/s')
        .children('input').attr('name','wd')
        
    }
})
$('#google').on('click', ()=>{
    if($('#google').attr('class') === 'inactive'){
        $('#google').attr('class','active')
        $('#baidu').attr('class','inactive')

        $('.searchForm').attr('action','https://www.google.com/search')
        .children('input').attr('name','q')
    }
})

const render_buttonColor = ()=>{
    if(i === 0){
        $('.previous').css("opacity","0.5")
        $('.next').css("opacity","1")
    }else if(i === 5){
        $('.previous').css("opacity","1")
        $('.next').css("opacity","0.5")
    }else{
        $('.previous').css("opacity","1")
        $('.next').css("opacity","1")
    }
}
let i = 0
const media = window.matchMedia("(min-width:500px)")
if (media.matches) { // 媒体查询
    $('body').css("background-image",`${bodyBackground[i]}`)
    render_buttonColor()
}else{
    $('body').css("background-image","url('https://api.dujin.org/bing/m.php')")
} 


$('.previous').on('click',()=>{
    if(i > 0){
        i--
        render_buttonColor()
        $('body').css("background-image",`${bodyBackground[i]}`)
    }
    
})
$('.next').on('click',()=>{
    if(i < 5){
        i++
        render_buttonColor()
        $('body').css({
            "background-image":`${bodyBackground[i]}`,
            
        })
        
    }
})

/* $('.copyright .text').text('我是底部文字') */

//localStorage
window.onbeforeunload = () =>{
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}