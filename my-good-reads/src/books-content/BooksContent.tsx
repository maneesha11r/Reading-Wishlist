import React from "react";

const BooksContent:React.FunctionComponent<any> = ({books, updateWishlistItem, wishlist}) => {
    return (
            books.length?
                <ul className="books-list">
                    {
                        books.map(({volumeInfo, id}:any) => {
                            const foundItem = wishlist.find((item:any) => id === item.id)
                            let item:any
                            let wishlistText:string = ''
                            let isInWishlist = false
                            if(foundItem) {
                                item = foundItem
                                wishlistText = 'Remove from wishlist'
                                isInWishlist = true
                            } else {
                                item = {id, name:volumeInfo.title}
                                wishlistText = 'Add to wishlist'
                            }
                            return (
                                <li key={id}>
                                    <div className="image-wrap">
                                        <div>
                                            <img src={volumeInfo.imageLinks.smallThumbnail} alt={volumeInfo.title} />
                                        </div>
                                        <div>
                                            <button className="wishlist-link" onClick={() => updateWishlistItem(item, isInWishlist)}>{wishlistText}</button>
                                        </div>
                                    </div>
                                    <div className="content">
                                        <p className="title">{volumeInfo.title}</p>
                                        <p className="subtitle">{volumeInfo.subtitle}</p>
                                        <p className="desc">{volumeInfo.description}</p>
                                        {volumeInfo.authors && <p className="author">By {volumeInfo.authors.join(', ')}</p>}
                                        <p className="publisher">{volumeInfo.publisher}</p>
                                        <p className="date">{volumeInfo.publishedDate}</p>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            : <p>No items to show</p>
    )
}
export default BooksContent;
