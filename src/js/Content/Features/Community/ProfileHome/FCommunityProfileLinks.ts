import self_ from "./FCommunityProfileLinks.svelte";
import Feature from "@Content/Modules/Context/Feature";
import type CProfileHome from "@Content/Features/Community/ProfileHome/CProfileHome";
import SteamCommunityApiFacade from "@Content/Modules/Facades/SteamCommunityApiFacade";
import HTML from "@Core/Html/Html";

export default class FCommunityProfileLinks extends Feature<CProfileHome> {

    private _reviewCount: number = 0;

    override checkPrerequisites(): boolean {
        return this.context.steamId !== null;
    }

    override apply(): void {

        let linksNode = document.querySelector(".profile_item_links");
        if (linksNode == null) {
            const rightColNode = document.querySelector(".profile_rightcol");
            HTML.beforeEnd(rightColNode, `<div class="profile_item_links"></div>`);
            HTML.afterEnd(rightColNode, '<div style="clear: both;"></div>');
            
            linksNode = document.querySelector(".profile_item_links");
        } 

	let hasReviews = false;
	let shouldAddReviews = false;
	const linkLabelNodes = linksNode.querySelectorAll("span.count_link_label");
	for (const value in linkLabelNodes) {
	    if (linkLabelNodes[value].innerHTML === "Reviews") {
	    	hasReviews = true;
	    }
	}
	
	if (!hasReviews) {
	    shouldAddReviews = true;
	    this._getReviewCount();
	    
	    if ( this._reviewCount < 1) {
	    	shouldAddReviews = false;
	    }
	
        (new self_({
            target: document.querySelector(".profile_item_links")!,
            props: {
                steamId: this.context.steamId!,
                clear: false,
                language: this.context.language?.name,
                addReviews: shouldAddReviews,
                total: this._reviewCount,
            }
        }));
    }
}

    private async _getReviewCount(): Promise<void> {
        this._reviewCount = await SteamCommunityApiFacade.getReviewCount(window.location.pathname);
        console.log("# reviews: ", this._reviewCount);
    }
}
