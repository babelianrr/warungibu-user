import React, {useState} from 'react'
import {Card} from "@/components/base";

export default function PromotionCard({promotion, isSelected, handleSelect}) {

    return (
        <>
            {
                promotion.id === isSelected ? (
                    <Card className="w-full mb-4 cursor-pointer bg-blue-200"
                          onClick={() => handleSelect(promotion)}
                    >
                        <div className="flex flex-row justify-between">
                            <div className="">
                                {promotion.code}
                            </div>
                            <div className="">
                                <svg width="20px" height="20px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2 16C2 8.26801 8.26801 2 16 2C23.732 2 30 8.26801 30 16C30 23.732 23.732 30 16 30C8.26801 30 2 23.732 2 16ZM20.9502 14.2929C21.3407 13.9024 21.3407 13.2692 20.9502 12.8787C20.5597 12.4882 19.9265 12.4882 19.536 12.8787L14.5862 17.8285L12.4649 15.7071C12.0744 15.3166 11.4412 15.3166 11.0507 15.7071C10.6602 16.0977 10.6602 16.7308 11.0507 17.1213L13.8791 19.9498C14.2697 20.3403 14.9028 20.3403 15.2933 19.9498L20.9502 14.2929Z" fill="#3A52EE"/>
                                </svg>
                            </div>
                        </div>
                    </Card>
                ) : (
                    <Card className="w-full mb-4 text-sm cursor-pointer hover:bg-blue-200"
                          onClick={() => handleSelect(promotion)}
                    >
                        <h4 align="left">{promotion.code}</h4>
                    </Card>
                )
            }
        </>
    )
}
