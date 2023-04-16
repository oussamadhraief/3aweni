import { IconContext } from 'react-icons'
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { RiImageEditFill } from 'react-icons/ri'
import { categories } from '../../../../utils/categoriesData'
import UploadPictureModal from '../../../../components/UploadImageModal'
import EditImageToUploadModal from '../../../../components/EditImageToUploadModal'
import axios from 'axios'
import { fundraiserInt } from '../../../../utils/interfaces'
import { states } from '../../../../utils/statesData'

export default function EditUserFundraiser() {

    const { id } = useParams()
	
	const navigate = useNavigate()

	const progressBarRef = useRef<HTMLProgressElement>(null)

	const [EditingImage, setEditingImage] = useState<boolean>(false)
	const [Open, setOpen] = useState<boolean>(false)
	const [Show, setShow] = useState<boolean>(false)
	const [Loading, setLoading] = useState<boolean>(true)
	const [image, setImage] = useState<string>('');
	const [croppedImage, setCroppedImage] = useState('');
    const [Fundraiser, setFundraiser] = useState<fundraiserInt>({_id: "", category: "", state: "", zipCode: 0, type: "", goal: undefined, user: '', image: null, title: '' })

	useEffect(() => {
        if(id){
            axios.get(`/api/fundraiser/${id}`,{
                withCredentials: true
            }).then((response) => {
                const { data: { fundraiser }} = response
                
                setFundraiser(fundraiser)
				setLoading(false)
            })
        }
    },[])

    const handleChange = (event: FormEvent) => {
		const target = event.target as HTMLInputElement

		setFundraiser({
			...Fundraiser,
			[target.name]: target.value
		})
    }

	const handleDeleteCurrentImage = async (currentImage: string) => {
		// maybe send id of user ??????
		await axios.post('/api/delete-image',{
			publicId: currentImage
		},{
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
		})
	}


	const handleUpdateFundraiserImage = async (newImage: string) => {
		await axios.patch(`/api/fundraiser/image/${Fundraiser._id}`,{
			image: newImage
		},{
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
		})
	}

	const handleImageUpload = (Base64EncodedImage: string) => {
		const currentImage = Fundraiser.image
		setEditingImage(true)
        axios.post('/api/upload',{
            data: Base64EncodedImage
        },{
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true,
            onUploadProgress: (progressEvent) => {
                const percentCompleted = (progressEvent.loaded / progressEvent.total!) * 100
                progressBarRef.current?.setAttribute('value',`${percentCompleted}`)
                // if(percentCompleted == 100) {
                //     add completed
                // }
            }
        }).then(res => {
            setFundraiser({
				...Fundraiser,
				image: res?.data?.imagePublicId.public_id
			})
			Promise.all([handleDeleteCurrentImage(currentImage!), handleUpdateFundraiserImage(res?.data?.imagePublicId.public_id)]).then(() => {
				
			  });
			setEditingImage(false)
        })
            
    }

  return (
    <main className="text-gray-600 bg-gray-100 dashboard-main-section overflow-auto">
        <section className="p-6">
			<button onClick={() => navigate('/account/dashboard/fundraisers')}>
				<IconContext.Provider value={{className: " text-gray-700 h-6 w-6"}}>
						<HiOutlineArrowNarrowLeft /> 
				</IconContext.Provider>
			</button>
			<form  className="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid">
				<fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm">
					<div className="space-y-2 col-span-full lg:col-span-1">
						<p className="font-medium">Modifiez votre 3aweni</p>
						<p className="text-xs">Modifiez toutes les informations relatives à votre funraiser (image, titre, description...)</p>
					</div>
					<div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">

						<div className='col-span-full grid grid-cols-6 gap-4'>
							<div className='relative col-span-full sm:col-span-3 aspect-[7/4] rounded overflow-hidden'>
								{Loading ?
								<div className='w-full h-full bg-gray-300 animate-pulse'>

								</div>
								 :
								<><img className="object-cover object-center w-full" src={Fundraiser.image ? `https://res.cloudinary.com/dhwfr0ywo/image/upload/${Fundraiser.image}` : "/3aweni_placeholder.png"} alt="content" />
								{EditingImage &&
								<div className="absolute inset-0 bg-white/60 flex items-end pb-5 justify-center flex-nowrap">
									<progress ref={progressBarRef} value={0} max={100} className='w-[96%] ml-[2%] h-2 overflow-hidden rounded bg-secondary_color/10 [&::-webkit-progress-bar]:bg-secondary_color/10 [&::-webkit-progress-value]:bg-secondary_color [&::-moz-progress-bar]:bg-secondary_color' ></progress>
								</div>}
								<button className='absolute top-1 right-1 bg-gray-700 p-1 rounded-full shadow-modern' type='button' onClick={() => setOpen(true)}>
									<IconContext.Provider value={{className: " text-white h-5 w-5"}}>
											<RiImageEditFill /> 
									</IconContext.Provider>
								</button>
								</>
								}
							</div>

						</div>


						<div className="col-span-full sm:col-span-3">
							<label htmlFor="title" className="text-sm">Titre</label>
							<input id="title" type="text" placeholder="Titre" value={Fundraiser.title} onChange={handleChange} className="w-full rounded-md outline-none text-sm h-9 px-1" />
						</div>
						<div className="col-span-full sm:col-span-3">
							<label htmlFor="goal" className="text-sm">Objectif</label>
							<input id="goal" type="number" placeholder="Objectif" value={Fundraiser.goal} onChange={handleChange} className="w-full rounded-md outline-none text-sm h-9 px-1" />
						</div>
						
						<div className="col-span-full sm:col-span-3">
							<label htmlFor="category" className="text-sm">Categorie</label>
							<select id="category" placeholder='Categorie'  className="block w-full h-9 text-sm text-gray-900 rounded-lg outline-none">
									{categories.map(item => <option value={item.value} selected={item.value === Fundraiser.category}>{item.label}</option>)}
	
							</select>
						</div>
						<div className="col-span-full sm:col-span-3">
							<label htmlFor="type" className="text-sm">Type</label>
							<select id="type" placeholder='Categorie'  className="block w-full h-9 text-sm text-gray-900 rounded-lg outline-none">
									<option value="Forme" selected={Fundraiser.type === "Forme"}>Pour moi</option> 
        
									<option value="Forsomeone" selected={Fundraiser.type === "Forsomeone"}>Pour quelqu'un d'autre</option> 
							</select>
						</div>
						<div className="col-span-full">
							<label htmlFor="description" className="text-sm">Description</label>
							<textarea id="description" placeholder="Description" className="w-full rounded-md outline-none text-sm h-32 p-1"></textarea>
						</div>
						<div className="col-span-full sm:col-span-3">
							<label htmlFor="state" className="text-sm">State</label>
							<select id="state" placeholder='State'  className="block w-full h-9 text-sm text-gray-900 rounded-lg outline-none">
									{states.map(item => <option value={item.value} selected={item.value === Fundraiser.state}>{item.label}</option>)}
	
							</select>
						</div>
						<div className="col-span-full sm:col-span-3">
							<label htmlFor="zipCode" className="text-sm">Code zip</label>
							<input id="zipCode" type="text" placeholder="Code zip" value={Fundraiser.zipCode} onChange={handleChange} className="w-full rounded-md outline-none text-sm h-9 px-1" />
						</div>
					</div>
				</fieldset>
				<fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm ">
					<div className="space-y-2 col-span-full lg:col-span-1">
						<p className="font-medium">Profile</p>
						<p className="text-xs">Adipisci fuga autem eum!</p>
					</div>
					<div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
						<div className="col-span-full sm:col-span-3">
							<label htmlFor="username" className="text-sm">Username</label>
							<input id="username" type="text" placeholder="Username" className="w-full rounded-md outline-none text-sm h-9 px-1 " />
						</div>
						<div className="col-span-full sm:col-span-3">
							<label htmlFor="website" className="text-sm">Website</label>
							<input id="website" type="text" placeholder="https://" className="w-full rounded-md outline-none text-sm h-9 px-1" />
						</div>
						<div className="col-span-full">
							<label htmlFor="bio" className="text-sm">Bio</label>
							<textarea id="bio" placeholder="" className="w-full rounded-md outline-none text-sm h-9 px-1"></textarea>
						</div>
						<div className="col-span-full">
							<label htmlFor="bio" className="text-sm">Photo</label>
							<div className="flex items-center space-x-2">
								<img src="https://source.unsplash.com/30x30/?random" alt="" className="w-10 h-10 rounded-full " />
								<button type="button" className="px-4 py-2 border rounded-md ">Change</button>
							</div>
						</div>
					</div>
				</fieldset>
			</form>
		</section>
		<UploadPictureModal open={Open} onClose={() => setOpen(false)} setShow={setShow} setImage={setImage} handleDeleteCurrentImage={handleDeleteCurrentImage} currentImage={Fundraiser.image} setFundraiser={setFundraiser} />
        <EditImageToUploadModal show={Show} onClose={() => setShow(false)} image={image} handleImageUpload={handleImageUpload} setCroppedImage={setCroppedImage} />
    </main>
  )
}
