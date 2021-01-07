import React, { useEffect, useRef, useState } from "react";
import BooksContent from "../books-content/BooksContent";
import Wishlist from "../wishlist/Wishlist";
import { getBooksByType } from "./book-search.service";


const BookSearch = () => {
    const [bookType, updateBookType] = useState("");
    const [bookTypeToSearch, updateBookTypeToSearch] = useState("");
    const [allAvailableBooks, setAllAvailableBooks] = useState<Array<any>>([]);
    const [wishlist, setWishlist] = useState<Array<any>>([])
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const timeoutValue:any = useRef()
    async function requestBooks() {
        if (bookTypeToSearch) {
            setIsFetching(true)
            const allBooks = await getBooksByType(bookTypeToSearch);
            setIsFetching(false)
            setAllAvailableBooks(allBooks.items || []);
        }
    }
    const updateWishlistItem = (item:any, isInWishlist:boolean) => {
        let newWishlist:Array<any> = []
        if(isInWishlist) {
            const index = wishlist.indexOf(item)
            newWishlist = [...wishlist.slice(0, index), ...wishlist.slice(index + 1)]
        } else {
            newWishlist = [...wishlist, item]
        }
        setWishlist(newWishlist)
    }
    useEffect(() => {
        if(timeoutValue.current) {
            clearTimeout(timeoutValue.current)
        }
        timeoutValue.current = setTimeout(() => {
            timeoutValue.current = null
            updateBookTypeToSearch(bookType)
            console.log('setBookTypeToSearch')
        }, 500)
    }, [bookType])
    useEffect(() => {
        async function getAllBooks() {
            await requestBooks();
        }
        getAllBooks();
    }, [bookTypeToSearch]);
    return (
            <>
                <div className="book--container">
                    <div className="search-params">
                        <div>
                            
                                <input
                                    className="full-width"
                                    autoFocus
                                    name="gsearch"
                                    type="search"
                                    value={bookType}
                                    placeholder="Search for books to add to your reading list and press Enter"
                                    onChange={e => updateBookType(e.target.value)}
                                />
                            {!bookType && !allAvailableBooks.length && (
                                <div className="empty">
                                    <p>
                                        Try searching for a topic, for example <button onClick={() => {
                                                updateBookType("Javascript");
                                            }}
                                        >"Javascript"</button>
                                    </p>
                                </div>
                            )}

                        </div>
                        {isFetching?<p className="loading-text">Loading...</p>:
                            <BooksContent wishlist={wishlist} updateWishlistItem={updateWishlistItem} books={allAvailableBooks} />
                        }
                    </div>
                    <div className="sidebar">
                        <Wishlist wishlist={wishlist} />
                    </div>
                </div>
            </>
    );
};

export default BookSearch;
