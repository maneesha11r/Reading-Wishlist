import React from "react";

const Wishlist:React.FunctionComponent<any> = ({wishlist}) => {
    return (
        <div className="wishlist-content">
            <p className="wishlist-title">My Reading Wishlist ({wishlist.length})</p>
            {wishlist.length? 
                <ul className="wishlist-items">
                    {wishlist.map(({id, name}:any) => {
                        return (
                            <li key={id}><p>{name}</p></li>
                        )
                    })}
                </ul>
                :null
            }
        </div>
    )
}
export default Wishlist;
