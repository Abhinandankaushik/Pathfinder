import PropTypes from 'prop-types';
import Icon from './Icon';

const InputForm = ({ formData, handleInputChange, handleSubmit, isLoading, error }) => (
    <div className="bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-[1.01] transition-transform duration-300">
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Structured Learning Path</h2>
            <p className="text-gray-500 mt-2">Share your goals, and let AI create a tailored roadmap for you.</p>
        </div>

        <div className="space-y-6">
            <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                    <Icon name="Target" className="h-5 w-5 text-indigo-600" />
                    <span>Learning Goal</span>
                </label>
                <textarea
                    name="goal"
                    value={formData.goal}
                    onChange={handleInputChange}
                    placeholder="e.g., Master Python for data science, Learn React.js for web development"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 text-gray-900 placeholder-gray-400 transition-all duration-200"
                    rows="4"
                    required
                />
            </div>

            <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                    <Icon name="User" className="h-5 w-5 text-indigo-600" />
                    <span>Current Level</span>
                </label>
                <select
                    name="currentLevel"
                    value={formData.currentLevel}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 text-gray-900 transition-all duration-200"
                >
                    <option value="">Select your level</option>
                    <option value="Complete Beginner">Complete Beginner</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                </select>
            </div>

            <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                    <Icon name="Clock" className="h-5 w-5 text-indigo-600" />
                    <span>Timeframe</span>
                </label>
                <select
                    name="timeframe"
                    value={formData.timeframe}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 text-gray-900 transition-all duration-200"
                >
                    <option value="">Select timeframe</option>
                    <option value="1 month">1 month</option>
                    <option value="3 months">3 months</option>
                    <option value="6 months">6 months</option>
                    <option value="1 year">1 year</option>
                    <option value="2+ years">2+ years</option>
                </select>
            </div>

            <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                    <Icon name="BookOpen" className="h-5 w-5 text-indigo-600" />
                    <span>Learning Style</span>
                </label>
                <select
                    name="learningStyle"
                    value={formData.learningStyle}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 text-gray-900 transition-all duration-200"
                >
                    <option value="">Select learning style</option>
                    <option value="Visual">Visual (Videos, Diagrams)</option>
                    <option value="Hands-on">Hands-on (Projects, Practice)</option>
                    <option value="Reading">Reading (Books, Articles)</option>
                    <option value="Mixed">Mixed Approach</option>
                </select>
            </div>

            <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                    <Icon name="Star" className="h-5 w-5 text-indigo-600" />
                    <span>Background & Experience</span>
                </label>
                <textarea
                    name="background"
                    value={formData.background}
                    onChange={handleInputChange}
                    placeholder="Describe your relevant background or experience..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 text-gray-900 placeholder-gray-400 transition-all duration-200"
                    rows="3"
                />
            </div>

            <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                    <Icon name="Zap" className="h-5 w-5 text-indigo-600" />
                    <span>Preferred Resources</span>
                </label>
                <input
                    type="text"
                    name="resources"
                    value={formData.resources}
                    onChange={handleInputChange}
                    placeholder="e.g., Free resources, Paid courses, Books"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 text-gray-900 placeholder-gray-400 transition-all duration-200"
                />
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 text-sm p-4 rounded-xl border border-red-200 animate-pulse">
                    {error}
                    <button
                        onClick={handleSubmit}
                        className="mt-2 text-indigo-600 underline"
                    >
                        Retry
                    </button>
                </div>
            )}

            <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-indigo-700 hover:to-blue-600 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
                {isLoading ? (
                    <>
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                        <span>Generating Roadmap...</span>
                    </>
                ) : (
                    <>
                        <Icon name="Send" className="h-5 w-5" />
                        <span>Create My Roadmap</span>
                    </>
                )}
            </button>
        </div>
    </div>
);

InputForm.propTypes = {
    formData: PropTypes.object.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
};

export default InputForm;