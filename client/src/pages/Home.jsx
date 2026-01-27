import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import HeroImage from '../assets/Images/TalentIQHero.png';

const Home = () => {
    return (
        <div className="relative isolate overflow-hidden bg-slate-50">
            <div className="mx-auto max-w-7xl px-6 pb-12 pt-10 sm:pb-16 lg:flex lg:px-8 lg:py-24 items-center">
                <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8 w-full">
                    <div className="mt-12 sm:mt-16 lg:mt-8">
                        <a href="#" className="inline-flex space-x-6">
                            <span className="rounded-full bg-blue-600/10 px-3 py-1 text-sm font-semibold leading-6 text-blue-600 ring-1 ring-inset ring-blue-600/10">
                                What's new
                            </span>
                            <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-slate-600">
                                <span>Just shipped v1.0</span>
                            </span>
                        </a>
                    </div>
                    <h1 className="mt-10 text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
                        Build your professional resume with AI
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-slate-600">
                        Create ATS-friendly resumes in minutes using our AI-powered builder. Stand out from the crowd and land your dream job faster.
                    </p>
                    <div className="mt-10 flex items-center gap-x-6">
                        <Link to="/create-resume">
                            <Button size="lg" className="px-8">Get started</Button>
                        </Link>
                        <Link to="/login">
                            <Button variant="outline" size="lg">Log in</Button>
                        </Link>
                    </div>
                </div>
                <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mt-0 lg:mr-0 lg:max-w-none lg:flex-none xl:ml-32">
                    <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
                        <div className="-m-2 rounded-xl bg-slate-900/5 p-2 ring-1 ring-inset ring-slate-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                            <img
                                src={HeroImage}
                                alt="App screenshot"
                                width={1200}
                                height={800}
                                className="w-[60rem] max-w-none rounded-md shadow-2xl ring-1 ring-slate-900/10"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
