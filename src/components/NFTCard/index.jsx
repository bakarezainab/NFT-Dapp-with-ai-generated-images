import React from "react";
import { formatEther } from "ethers";
import { truncateString } from "../../utils";

const NFTCard = ({ metadata, mintPrice, tokenId, nextTokenId, mintNFT, transferNft }) => {
    const isOwned = Number(nextTokenId) > tokenId;
    
    return (
        <div className="rounded-lg overflow-hidden bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300 border border-purple-900">
            {/* NFT Image Container */}
            <div className="relative">
                <img
                    src={metadata.image}
                    alt={`${metadata.name}`}
                    className="w-full h-60 object-cover"
                />
                <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-teal-400">
                    #{tokenId}
                </div>
            </div>
            
            {/* Content */}
            <div className="p-4">
                <h3 className="text-lg font-semibold text-teal-300 mb-2">{metadata.name}</h3>
                
                <p className="text-sm text-gray-300 mb-3">
                    {truncateString(metadata.description, 90)}
                </p>
                
                {/* Attributes */}
                <div className="mb-4">
                    <div className="text-xs text-gray-400 mb-1">Attributes</div>
                    <div className="flex flex-wrap gap-1">
                        {metadata.attributes.slice(0, 3).map((attr, index) => (
                            <span key={index} className="text-xs px-2 py-1 bg-purple-900/50 text-purple-300 rounded">
                                {attr.trait_type}: {attr.value}
                            </span>
                        ))}
                        {metadata.attributes.length > 3 && (
                            <span className="text-xs px-2 py-1 bg-purple-900/50 text-purple-300 rounded">
                                +{metadata.attributes.length - 3}
                            </span>
                        )}
                    </div>
                </div>
                
                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                        <svg 
                            className="w-4 h-4 mr-1 text-amber-400" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                        </svg>
                        <span className="font-medium text-amber-400">{formatEther(mintPrice)} ETH</span>
                    </div>
                    
                    <div className={`px-2 py-1 text-xs font-medium rounded-full ${
                        isOwned 
                            ? "bg-green-900 text-green-300" 
                            : "bg-cyan-900 text-cyan-300"
                    }`}>
                        {isOwned ? "Owned" : "Available"}
                    </div>
                </div>
                
                {/* Action Button */}
                {!isOwned ? (
                    <button
                        disabled={Number(nextTokenId) !== tokenId}
                        onClick={mintNFT}
                        className={`w-full py-2 px-4 rounded font-medium text-center transition-colors ${
                            Number(nextTokenId) !== tokenId 
                                ? "bg-gray-700 text-gray-400 cursor-not-allowed" 
                                : "bg-gradient-to-r from-purple-600 to-teal-500 text-white hover:from-purple-700 hover:to-teal-600"
                        }`}
                    >
                        {Number(nextTokenId) === tokenId ? "Mint NFT" : "Coming Soon"}
                    </button>
                ) : (
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            onClick={() => transferNft && transferNft(tokenId)}
                            className="py-2 px-3 bg-teal-700 hover:bg-teal-800 text-teal-100 rounded font-medium text-sm"
                        >
                            Transfer
                        </button>
                        <button
                            className="py-2 px-3 bg-purple-800 hover:bg-purple-900 text-purple-100 rounded font-medium text-sm"
                        >
                            Details
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NFTCard;