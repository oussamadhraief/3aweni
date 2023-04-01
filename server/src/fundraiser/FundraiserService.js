const Fundraiser = require('./FundraiserModel');

const createFundraiser = async (uid, category, state, zipCode, type, goal) => {
    try {
            
            const newFundraiser = await Fundraiser.create({
                user: uid, 
                category: category,
                state: state,
                zipCode: parseInt(zipCode),
                type: type,
                goal: parseInt(goal),
                archived: false,
                title: null,
                image: null
            })
            
            return newFundraiser

    } catch (error) {
        return res.status()
    }
}


exports.createFundraiser = createFundraiser