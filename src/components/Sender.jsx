import React from 'react';

const Sender = () => {
    return (
        <div>
            <form method="POST" action="/notifications">
                <input id="requester_email" name="requester_email" type="email" />
                <input id="offerer_email" name="offerer_email" type="email" />
                <input id="item_id" name="item_id" type="text" />
                <button>Send notification!</button>
            </form>
        </div>
    )
}

export default Sender;