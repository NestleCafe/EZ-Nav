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
const bodyBackground = [
    "./imges/background/background_1.jpg",
    "./imges/background/background_2.jpg",
    "./imges/background/background_3.jpg",
    "./imges/background/background_4.jpg",
    "./imges/background/background_5.jpg",
    "./imges/background/background_6.jpg",
]

/*  $('body').css("background-image",`url('${bodyBackground[2]}')`) */ //问题

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
//localStorage
window.onbeforeunload = () =>{
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}
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
let i=0
render_buttonColor()
$('.previous_pic').on('click',(e)=>{
    if(i !==0){
        i--
        render_buttonColor()
    }
    
})
$('.next_pic').on('click',(e)=>{
    if(i !== 5){
        i++
        render_buttonColor()
    }
})
