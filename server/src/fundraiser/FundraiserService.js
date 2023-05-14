const Fundraiser = require('./FundraiserModel');

const createFundraiser = async (uid, category, state, zipCode, type, title, goal) => {
    try {
            
            const newFundraiser = await Fundraiser.create({
                user: uid, 
                category: category,
                state: state,
                zipCode: parseInt(zipCode),
                type: type,
                goal: goal,
                archived: false,
                title: title,
                image: null,
                description: null,
                secondaryImages: [],
                secondaryVideos: []
            })
            
            return newFundraiser

    } catch (error) {
        console.log(error);
    }
}


exports.createFundraiser = createFundraiser