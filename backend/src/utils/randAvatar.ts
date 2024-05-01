const avatar = [
    "https://res.cloudinary.com/dlzyiprib/image/upload/v1708709670/canteen/user/ri3zkhvywdrpo6wvvlqd.webp",
    "https://res.cloudinary.com/dlzyiprib/image/upload/v1708709142/canteen/user/d7oad3iccgncjrzmvwiw.png",
    "https://res.cloudinary.com/dlzyiprib/image/upload/v1704473059/canteen/user/xjsfo4aljokkm3edu5l2.png",
    "https://res.cloudinary.com/dlzyiprib/image/upload/v1711729194/e-commerces/user/true_ui_xzdsyg.webp",
    "https://res.cloudinary.com/dlzyiprib/image/upload/v1711729068/e-commerces/user/ultra_ego_lwq9dp.png",
    "https://res.cloudinary.com/dlzyiprib/image/upload/v1711729050/e-commerces/user/mui_f1nsgs.jpg",
    "https://res.cloudinary.com/dlzyiprib/image/upload/v1694681111/e-commerces/user/o1taxgsgmfvxklvd0pon.jpg",
    "https://res.cloudinary.com/dlzyiprib/image/upload/v1700229890/e-commerces/user/idaifpprbyg2qoqhyr1u.jpg",
];

const randAvatar = () => avatar[Math.round(Math.random() * avatar.length)];

export default randAvatar;
