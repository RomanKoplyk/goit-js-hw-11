import axios from "axios";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { getImagesByQuery } from "./js/pixabay-api.js";
import { createGallery, clearGallery, showLoader, hideLoader } from "./js/render-functions.js";

const searchForm = document.querySelector(".form");
const galleryContainer = document.querySelector(".gallery");
const loader = document.querySelector(".loader");

searchForm.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    const query = event.currentTarget.elements[`search-text`].value.trim();

    if (!query) {
        iziToast.warning({
            message: "Please enter a search query!",
            position: 'topRight'
        });
        return;
    }

    clearGallery();
    showLoader();

    getImagesByQuery(query)
        .then(data => {
            if (data.hits.length === 0) {
                iziToast.error({
                    message: "Sorry, there are no images matching your search query. Please try again!",
                    position: 'topRight',
                    backgroundColor: '#EF4040', 
                    messageColor: '#FFF',
                    iconColor: '#FFF',
                    progressBarColor: '#B51B1B',
                })
                return;
            }
            
           createGallery(data.hits);
        })
        .catch(error => {
            console.log(error);
            iziToast.error({
                message: "Something went wrong. Please try again later!",
                position: 'topRight'
            });
        })
        .finally(() => {
            hideLoader();
            event.target.reset();
    });
}