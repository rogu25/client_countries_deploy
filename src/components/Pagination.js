import React, { useEffect } from 'react';

import "../css/Pagination.css";

function Pagination({ elementos, inicio, final, id, onclickSelectPage, onclickNextPage, onclickBackPage, onclickChangeNextPage, onclickChangeBackPage, onclickCallBack }) {

    useEffect(() => {
        onclickCallBack()
    }, [onclickCallBack]);

    return (
        <div className="paginado">
            <button
                className='change_page'
                onClick={onclickChangeBackPage}
            >
                {'<<'}
            </button>
            <div className='content_btn_page'>
                <button
                    className='btn_page custom_btn'
                    onClick={onclickBackPage}
                >
                    {'<'}
                </button>
                {
                    elementos.length && elementos.map((e) => {
                        return (
                            <button
                                name='pagenumber'
                                key={e} id={e}
                                onClick={() => onclickSelectPage(e)}
                                className={id === (e) ? 'btn_page activo' : 'btn_page'}
                            >
                                {e}
                            </button>
                        )
                    }).slice(inicio, final)
                }
                <button
                    className='btn_page custom_btn'
                    onClick={onclickNextPage}
                >
                    {'>'}
                </button>
            </div>
            <button
                className='change_page'
                onClick={onclickChangeNextPage}
            >
                {'>>'}
            </button>

        </div>
    )
}

export default Pagination;