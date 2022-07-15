import { v4 as uuidv4 } from "uuid";

export const categories = [
  {
    name: "coding",
    id: uuidv4(),
    image:
      "https://cdn.pixabay.com/photo/2016/11/23/14/45/coding-1853305_960_720.jpg",
  },
  {
    name: "anime",
    id: uuidv4(),
    image:
      "https://cdn.pixabay.com/photo/2016/12/14/12/30/girl-1906187_960_720.jpg",
  },
  {
    name: "toys",
    id: uuidv4(),
    image:
      "https://cdn.pixabay.com/photo/2016/12/14/12/30/girl-1906187_960_720.jpg",
  },
  {
    name: "baby",
    id: uuidv4(),
    image:
      "https://cdn.pixabay.com/photo/2016/01/20/11/11/baby-1151351_960_720.jpg",
  },
  {
    name: "vector",
    id: uuidv4(),
    image:
      "https://cdn.pixabay.com/photo/2017/01/12/05/21/mom-1973778_960_720.jpg",
  },
  {
    name: "music",
    id: uuidv4(),
    image:
      "https://cdn.pixabay.com/photo/2015/05/07/11/02/guitar-756326_960_720.jpg",
  },
  {
    name: "designs",
    id: uuidv4(),
    image:
      "https://cdn.pixabay.com/photo/2017/08/10/02/05/tiles-shapes-2617112_960_720.jpg",
  },
  {
    name: "nature",
    id: uuidv4(),
    image:
      "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_960_720.jpg",
  },
  {
    name: "rain",
    id: uuidv4(),
    image:
      "https://cdn.pixabay.com/photo/2013/02/21/19/11/rain-84648_960_720.jpg",
  },
  {
    name: "furniture",
    id: uuidv4(),
    image:
      "https://cdn.pixabay.com/photo/2017/09/09/18/25/living-room-2732939_960_720.jpg",
  },
  {
    name: "cars",
    id: uuidv4(),
    image:
      "https://cdn.pixabay.com/photo/2020/05/14/19/36/bmw-5171111_960_720.jpg",
  },
  {
    name: "bikes",
    id: uuidv4(),
    image:
      "https://cdn.pixabay.com/photo/2016/04/07/06/53/bmw-1313343_960_720.jpg",
  },
  {
    name: "love",
    id: uuidv4(),
    image:
      "https://cdn.pixabay.com/photo/2018/02/12/10/45/heart-3147976_960_720.jpg",
  },
  {
    name: "Sky",
    id: uuidv4(),
    image:
      "https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547_960_720.jpg",
  },
  {
    name: "fitness",
    id: uuidv4(),
    image:
      "https://cdn.pixabay.com/photo/2017/08/07/14/02/man-2604149_960_720.jpg",
  },
  {
    name: "cats",
    id: uuidv4(),
    image:
      "https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_960_720.jpg",
  },
  {
    name: "dogs",
    id: uuidv4(),
    image:
      "https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313_960_720.jpg",
  },
  {
    name: "forest",
    id: uuidv4(),
    image:
      "https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297_960_720.jpg",
  },
  {
    name: "night",
    id: uuidv4(),
    image:
      "https://cdn.pixabay.com/photo/2016/11/25/23/15/moon-1859616_960_720.jpg",
  },
  {
    name: "mountain",
    id: uuidv4(),
    image:
      "https://cdn.pixabay.com/photo/2016/08/09/21/54/lake-1581879_960_720.jpg",
  },
  {
    name: "places",
    id: uuidv4(),
    image:
      "https://cdn.pixabay.com/photo/2016/07/30/08/13/moscow-1556561_960_720.jpg",
  },
];

// user query
export const userQuery = (userId) => {
  const query = `*[_type == 'user' && _id == '${userId}']`;
  //   checking the user table in sanity and fetching the matching id

  return query;
};

export const userCreatedPinsQuery = (userId) => {
  const query = `*[ _type == 'pin' && userId == '${userId}'] | order(_createdAt desc){
    image{
      asset->{
        url
      }
    },
    id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const userSavedPinsQuery = (userId) => {
  const query = `*[_type == 'pin' && '${userId}' in save[].userId ] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const searchQuery = (searchTerm) => {
  const query = `*[_type == 'pin' && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*' ]{
    image{
      asset -> {
        url
      }
    },
    _id,
    destination,
    postedBy -> {
      _id,
      userName,
      image
    },
    save[]{
      _key,
      postedBy -> {
        _id,
        userName,
        image
      },
    },
  }`;

  return query;
};

export const feedQuery = `*[_type == 'pin'] | order(_createAt desc){
  image{
    asset -> {
      url
    }
  },
  _id,
  destination,
  postedBy -> {
    _id,
    userName,
    image
  },
  save[]{
    _key,
    postedBy -> {
      _id,
      userName,
      image
    },
  },
}`;

export const pinDetailQuery = (pinId) => {
  const query = `*[_type == "pin" && _id == '${pinId}']{
    image{
      asset->{
        url
      }
    },
    id,
    title, 
    about,
    category,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
   save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    }
  }`;
  return query;
};

export const pinDetailMorePinQuery = (pin) => {
  const query = `*[_type == "pin" && category == '${pin.category}' && _id != '${pin.id}' ]{
    image{
      asset->{
        url
      }
    },
    id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};
