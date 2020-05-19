import Unsplash, { toJson } from 'unsplash-js';

const unsplash = new Unsplash({
    accessKey: "my_access_key",
    secret: "my_secret",
    callbackUrl: "http://vqportal.ru/auth",
    headers: {
        "Accept-Version": "v1"
    }
});

const authenticationUrl = unsplash.auth.getAuthenticationUrl([
    "public",
    "write_likes"
]);

export const PhotoAPI = {
    getRandom() {
        return unsplash.photos.getRandomPhoto()
            .then(toJson)
            .then(json => json.urls);
    },
    getPhotosList(page) {
        return unsplash.photos.listPhotos(page, 9)
            .then(toJson)
            .then(json => json) 
    },
    getPhoto(id) {
        return unsplash.photos.getPhoto(id)
            .then(toJson)
            .then(json => json);
    },
    likePost(id) {
        return unsplash.photos.likePhoto(id)
        .then(toJson)
        .then(json => json.photo)
    }, 
    unlikePost(id) {
        return unsplash.photos.unlikePhoto(id)
        .then(toJson)
        .then(json => json)
    }

}

export const AuthAPI = {
    redirForAuth() {
        return location.assign(authenticationUrl);
    },
    setAuthCode(code) {
        return unsplash.auth.userAuthentication(code)
            .then(toJson)
            .then(json => {
                unsplash.auth.setBearerToken(json.access_token);
            });
    }
}