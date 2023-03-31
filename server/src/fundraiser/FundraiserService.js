const Fundraiser =require('./FundraiserModel');

const createFundraiser = async (uid, category, state, zipCode, type, goal) => {
    try {
      
            const newFundraiser = await Fundraiser.create({
                user: uid, 
                category,
                state,
                zipCode,
                type,
                goal
            })
    
            return newFundraiser

    } catch (error) {

        throw new Error('Unable to create a new fundraiser')
        
    }
}


exports.createFundraiser = createFundraiser