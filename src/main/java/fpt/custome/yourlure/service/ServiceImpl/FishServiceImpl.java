package fpt.custome.yourlure.service.ServiceImpl;

import fpt.custome.yourlure.dto.dtoInp.FishDtoInput;
import fpt.custome.yourlure.dto.dtoOut.FishDtoOut;
import fpt.custome.yourlure.entity.Fish;
import fpt.custome.yourlure.repositories.FishRepos;
import fpt.custome.yourlure.service.FishService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FishServiceImpl implements FishService {

    @Autowired
    private FishRepos fishRepos;

    @Autowired
    private ModelMapper mapper;

    @Override
    public List<FishDtoOut> getAll() {
        List<FishDtoOut> result = new ArrayList<>();
        List<Fish> list = fishRepos.findAll();
        for (Fish item : list) {
            FishDtoOut dtoOut = mapper.map(item, FishDtoOut.class);
            result.add(dtoOut);
        }
        return result;
    }

    @Override
    public List<FishDtoOut> adminGetAll(Pageable pageable) {
        List<FishDtoOut> results = new ArrayList<>();
        try {
            Page<Fish> list = fishRepos.findAll(pageable);
            for (Fish item : list) {
                FishDtoOut dtoOut = mapper.map(item, FishDtoOut.class);
                results.add(dtoOut);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return results;
    }

    @Override
    public Optional<FishDtoOut> getById(Long id) {
        Optional<Fish> fishOptional = fishRepos.findById(id);
        if (fishOptional.isPresent()) {
            FishDtoOut result = mapper.map(fishOptional.get(), FishDtoOut.class);
            return Optional.of(result);
        }
        return Optional.empty();
    }

    @Override
    public Boolean save(FishDtoInput fishDtoInput) {
        try {
            Fish fishInput = mapper.map(fishDtoInput, Fish.class);
            fishRepos.save(fishInput);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    public Boolean update(FishDtoInput fishDtoInput, Long id) {
        try {
            if (id != null && fishDtoInput != null) {
                Fish fishToUpdate = fishRepos.findById(id).get();
                fishToUpdate.builder()
                        .fishName(fishDtoInput.getFishName())
                        .build();
                fishRepos.save(fishToUpdate);
            } else {
                return false;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    public Boolean remove(Long id) {
        try {
            fishRepos.deleteById(id);
        } catch (
                Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return false;
        }
        return true;
    }
}
