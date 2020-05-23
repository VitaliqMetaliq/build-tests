import Unsplash, { toJson } from 'unsplash-js';

const unsplash = new Unsplash({
    accessKey: "OFdR8Rw3yS0wAvT8AlyRmkf5FX9oLBo5JZgpwUyQUps",
    secret: "CRV8fKylwYYQc0vtkQlNPBg6M5WGeDFam0uwwS6jrWI",
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
                localStorage.setItem("unsplash_access_key", json.access_token);
            });
    }, 
    setAuthCodeFromLs(token) {
        return unsplash.auth.setBearerToken(token);
    }
}