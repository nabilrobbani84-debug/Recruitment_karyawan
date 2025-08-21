    <?php

    namespace App\Http\Controllers\Api\V1;

    use App\Models\Company;
    use App\Models\User;
    use Illuminate\Http\Request;
    use Illuminate\Support\Str;
    use App\Http\Controllers\Controller;  // Ensure this is used
    use Illuminate\Http\JsonResponse;
    use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
    use Illuminate\Support\Facades\Auth;
    use Illuminate\Support\Facades\Storage;
    use App\Http\Resources\V1\CompanyResource;
    use App\Http\Resources\V1\JobResource;

    class CompanyController extends Controller // Extending Controller for authorization
    {
        /**
         * Display a list of active companies.
         */
        public function index(Request $request): AnonymousResourceCollection
        {
            $companies = Company::query()
                ->where('is_active', true)
                ->withCount(['jobs' => fn($query) => $query->where('is_active', true)])
                ->when($request->query('search'), fn($query, $search) =>
                    $query->where('name', 'like', "%{$search}%")
                )
                ->latest()
                ->paginate(12)
                ->withQueryString();

            return CompanyResource::collection($companies);
        }

        /**
         * Display the details of a single active company.
         */
        public function show(Company $company): CompanyResource|JsonResponse
        {
            if (!$company->is_active) {
                return response()->json(['message' => 'Company not found.'], 404);
            }

            $company->load(['jobs' => fn($query) => $query->where('is_active', true)->latest()]);

            return new CompanyResource($company);
        }

        /**
         * Store a new company profile.
         */
        public function store(Request $request): JsonResponse
        {
            /** @var User $user */
            $user = Auth::user();

            if ($user->company) {
                return response()->json(['message' => 'You already have a company profile.'], 403);
            }

            $validated = $request->validate([
                'name' => 'required|string|max:255|unique:companies,name',
                'website' => 'nullable|url|max:255',
                'description' => 'required|string',
                'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);

            $validated['user_id'] = $user->id;  // Make sure the User has an 'id' field
            $validated['slug'] = Str::slug($validated['name']);

            if ($request->hasFile('logo')) {
                $validated['logo'] = $request->file('logo')->store('company-logos', 'public');
            }

            $company = Company::create($validated);

            return response()->json([
                'message' => 'Company profile created successfully.',
                'data' => new CompanyResource($company)
            ], 201);
        }

        /**
         * Update the company profile.
         */
        public function update(Request $request, Company $company): JsonResponse
        {
            $this->authorize('update', $company);  // Ensure 'authorize' method is available through Controller

            $validated = $request->validate([
                'name' => 'required|string|max:255|unique:companies,name,' . $company->id,
                'website' => 'nullable|url|max:255',
                'description' => 'required|string',
            ]);

            if (isset($validated['name'])) {
                $validated['slug'] = Str::slug($validated['name']);
            }

            $company->update($validated);

            return response()->json([
                'message' => 'Company profile updated successfully.',
                'data' => new CompanyResource($company->fresh())
            ]);
        }

        /**
         * Delete a company.
         */
        public function destroy(Company $company): JsonResponse
        {
            $this->authorize('delete', $company);  // Ensure 'authorize' method is available

            if ($company->logo) {
                Storage::disk('public')->delete($company->logo);
            }

            $company->delete();

            return response()->json(null, 204);
        }
    }
