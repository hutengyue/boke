const DISTANCE = 150;
const DURATION = 1000;
const animationMap = new WeakMap();

const ob = new IntersectionObserver(entries => {
    for (const entry of entries) {
        if (entry.isIntersecting) {    // isIntersecting这个属性判断元素是否与视口（或根元素）交叉
            const animation = animationMap.get(entry.target);
            animation.play();
            ob.unobserve(entry.target);
        }
    }
})

// 判断元素是不是在视口之下
function isBelowViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top > window.innerHeight;
}

export default {
    mounted(el) {
        if (!isBelowViewport(el)) {
            return;
        }
        const animation = el.animate([
                {
                    transform: `scale(0.7,0.7)`,
                    opacity: 0
                },
                {
                    transform: 'scale(1,1)',
                    opacity: 1
                },
            ],
            {
                duration: DURATION,
                easing: 'ease'
            })
        animation.pause();  // 暂停动画
        animationMap.set(el, animation);
        ob.observe(el);
    },
    beforeUnmount(el) {
        ob.unobserve(el);
    }
}